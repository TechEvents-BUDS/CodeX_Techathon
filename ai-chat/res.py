from flask import Flask, request, jsonify
import uuid
import os
from flask_cors import CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GENAI_API_KEY")
if not api_key:
    raise ValueError("GENAI_API_KEY env not set")
genai.configure(api_key=api_key)

system_prompt = (
    "Your name is Jarvis from Iron man. "
    "Do not explicitly mention your name until you are prompted to do so. "
    "You are a computer science career counselor. "
    "Maintain your tone such that it speaks like an integrated version of jarvis restricted to being career-counselor. "
    "Your task is to help users explore career paths in software and provide guidance. "
    "You should ignore responses that do not make much sense. "
    "You should turn down politely if user asks for counseling other than areas that come under computer science domain or technology domain. "
    "You can assist the user in web, containerization, cloud-computing, AI and its sub-domains, and other related technological and non-programming fields. "
    "You can motivate the user towards the role they want to specialize in as well, but remember it should be domain-specific(computer science). "
    "You should keep the conversation friendly."
    "You should tell the user should If the user response is repeating and does not provide any insight."
)
model = genai.GenerativeModel(
    "gemini-1.5-flash",
    generation_config={"temperature": 0.5},
    system_instruction=system_prompt
)
DEFAULT_STATE = {
    "state": "start",
    "goal": None,
    "experience": None,
    "history": [],
    "completeguidance": ""  
}
user_sessions = {}

@app.route('/chat', methods=['POST'])
def chat():
    user_id = request.json.get("user_id")
    user_message = request.json.get("message")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400
    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    if user_id not in user_sessions:
        user_sessions[user_id] = DEFAULT_STATE.copy()

    user = user_sessions[user_id]

    try:
        if user["state"] == "start":
            user["state"] = "goal"
            return jsonify({"message": "Welcome! What do you want to be in your software career?", "user_id": user_id})

        elif user["state"] == "goal":
            user["goal"] = user_message
            user["state"] = "experience"
            goal = user["goal"].lower()
            prompt = f"Now ask the experience level of the user in {goal}"
            response = model.generate_content(prompt)
            user["history"].append({"goal": goal})
            return jsonify({"message": response.text, "user_id": user_id})

        elif user["state"] == "experience":
            user["experience"] = user_message
            user["state"] = "ask_question"

            goal = user["goal"].lower()
            experience = user["experience"].lower()

            if "developer" in goal or "programmer" in goal or "engineer" in user["history"]:
                question_prompt = (
                    f"Generate a coding question suitable for a '{experience}' level and wants to be '{goal}'."
                )
            else:
                question_prompt = (
                    f"Generate a technical question (non-coding) suitable for a '{experience}' level and wants to be '{goal}'."
                )

            response = model.generate_content(question_prompt)
            question = response.text

            user["history"].append({"goal": goal, "experience": experience, "question": question})
            user["state"] = "evaluate_answer"

            return jsonify({"message": question, "user_id": user_id})

        elif user["state"] == "evaluate_answer":
            user_answer = user_message
            last_question = user["history"][-1].get("question", "N/A")

            evaluation_prompt = (
                f"Evaluate the following answer to the question in the role of a software career counselor, "
                f"providing teaching and a reality check, and guide the user accordingly:\n"
                f"This was the you asked : Question: {last_question}\nThis is the answer you gave and evaluate this Answer: {user_answer}"
            )

            response = model.generate_content(evaluation_prompt)
            evaluation = response.text

            user["history"].append({"answer": user_answer, "evaluation": evaluation})
            user["state"] = "guidance"

            return jsonify({"message": evaluation, "user_id": user_id})

        elif user["state"] == "guidance":
            goal = user["goal"].lower()
            experience = user["experience"].lower()

            conversation_history = ""
            for entry in user["history"]:
                question = entry.get("question", "N/A")
                answer = entry.get("answer", "N/A")
                evaluation = entry.get("evaluation", "N/A")
                guidance = entry.get("guidance", "N/A")

                conversation_history += f"Evaluation: {evaluation}\n"

            guidance_prompt = ( 
                f"Only provide career guidance to a '{experience}' level '{goal}' with respect to their {user_message}. "
                "Offer recommendations on what skills to focus on, next steps in their career, and courses/resources they can use. "
                f"Counsel {user_message} with great consideration."
                "Consider the following conversation history for context:\n"
                f"{conversation_history}"
            )
            response = model.generate_content(guidance_prompt)
            guidance = response.text
            user["history"].append({"guidance":guidance})
            if user_message.lower() == "/exit":
                user_sessions[user_id] = DEFAULT_STATE.copy()

            return jsonify({"message": guidance, "user_id": user_id})

        else:
            return jsonify({"error": "Unknown state", "user_id": user_id}), 400

    except Exception as e:
        return jsonify({"error": str(e), "user_id": user_id}), 500


if __name__ == '__main__':
    app.run("127.0.0.1", port=5000)

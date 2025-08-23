const url = "https://tarsila.audiofusion.com.br";
const headers = { "Content-Type": "application/json" };

export enum MSG_TYPES {
  AI_TEXT = "ai_message",
  USER_TEXT = "user_message",
}

export type Message = {
  msg_type: MSG_TYPES;
  message: string;
  timestamp: string;
};

export interface RequestError {
  errorMsg: string;
}

export interface Conversation {
  history: Message[];
  draft: string;
}

export async function firstLoad(
  user: string,
  chat_id: string
): Promise<Conversation | RequestError> {
  const path = "/v1/start-chat";
  const body = JSON.stringify({
    user,
    chat_id,
  });

  try {
    const resp = await fetch(url + path, { method: "POST", headers, body });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data: Conversation = (await resp.json()) as Conversation;

    // verifica se dados obrigatorios foram retornados

    // if (!data.chat_id) {
    //   throw new Error("Missing chatId.");
    // } else if (!data.greetings) {
    //   throw new Error("Missing greetings.");
    // }

    return data;
  } catch (error) {
    console.error(error);
    return { errorMsg: error } as RequestError;
  }
}

export async function sendMessage(
  chat_id: string,
  message: string
): Promise<Conversation | RequestError> {
  const path = "/v1/chat/text";
  const body = JSON.stringify({
    chat_id,
    message,
  });

  try {
    const resp = await fetch(url + path, { method: "POST", headers, body });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const data = (await resp.json()) as Conversation;

    // verifica se dados obrigatorios foram retornados

    // if (!data.ai_message) {
    //   throw new Error("Missing ai_message.");
    // }

    return data;
  } catch (error) {
    console.error(error);
    return { errorMsg: error } as RequestError;
  }
}

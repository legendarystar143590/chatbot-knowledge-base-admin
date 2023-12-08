export const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ENDPOINT

export const API_Address = SERVER_ADDRESS

export const PROMPT_API = {
  ADD_PRE_PROMPT: API_Address + "/pre_prompt",    // post
  GET_PRE_PROMPTS: API_Address + "/pre_prompt",    // get
  DELETE_PRE_PROMPT: API_Address + "/del_pre_prompt",    // post
  UPDATE_PRE_PROMPT: API_Address + "/update_pre_prompt",    // post

  ADD_CLOSER_PROMPT: API_Address + "/closer_prompt",    // post
  GET_CLOSER_PROMPTS: API_Address + "/closer_prompt",    // get
  DELETE_CLOSER_PROMPT: API_Address + "/del_closer_prompt",    // post
  UPDATE_CLOSER_PROMPT: API_Address + "/update_closer_prompt",    // post

  ADD_PUSH_PROMPT: API_Address + "/push_prompt",    // post
  GET_PUSH_PROMPTS: API_Address + "/push_prompt",    // get
  DELETE_PUSH_PROMPT: API_Address + "/del_push_prompt",    // post
  UPDATE_PUSH_PROMPT: API_Address + "/update_push_prompt",    // post
}

export const KNOWLEDGE_BASE_API = {
  ADD_KNOWLEDGE_BASE: API_Address + "/add_knowledge",     // get
  GET_KNOWLEDGE_BASE: API_Address + "/get_knowledge",     // post
  DELETE_KNOWLEDGE_BASE: API_Address + "/del_knowledge",     // post
  UPDATE_KNOWLEDGE_BASE: API_Address + "/update_knowledge",     // post
}
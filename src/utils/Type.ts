export type SubMenu = {
  path: string,
  icon: JSX.Element,
  name: string
}

export type SideMenu = Array<{
  path: string,
  icon: JSX.Element,
  name: string,
  submenu?: SubMenu[]
}>

export type Assistant = {
  id?: string,
  assistant_name: string,
  date?: string,
  prompt: string,
  use_sql: boolean,
  sql_host: string,
  sql_db_name: string,
  sql_port: string,
  sql_username: string,
  sql_password: string,
  use_pinecone: boolean,
  pinecone_index_name: string,
  pinecone_environment: string,
  pinecone_api_key: string,
}

export type KnowledgeBase = {
  id?: string,
  name: string,
  assistant_id: string,
  type_of_knowledge: string,
  status: string,
  date?: string,
  file?: File | null
}

export type Prompt = {
  id?: string,
  assistant_id: string,
  title?: string,
  prompt: string,
  date?: string
}
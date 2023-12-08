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

export type KnowledgeBase = {
  id?: string,
  name: string,
  type: string,
  status: string,
  date?: string
}

export type Prompt = {
  id?: string,
  title?: string,
  prompt: string,
  date?: string
}
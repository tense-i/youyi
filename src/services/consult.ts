import type { KnowledgePage, KnowledgeParams } from '@/types/consult/Knowledge'
import { request } from '@/utils/request'

export const getKnowledgePage = (params: KnowledgeParams) =>
  request<KnowledgePage>('/patient/home/knowledge', 'GET', params)

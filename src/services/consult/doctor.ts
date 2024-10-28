import type { DoctorPage } from '@/types/consult/doctor'
import { request } from '@/utils/request'
import type { PageParams } from '@/types/common'
import type { FollowType } from '@/types/consult/doctor'
export const getDoctorPage = (params: PageParams) =>
  request<DoctorPage>('/home/page/doc', 'GET', params)

// 关注医生
export const followDoctor = (id: string, type: FollowType = 'doc') =>
  request('/like', 'POST', { id, type })

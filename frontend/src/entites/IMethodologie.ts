import { z } from "zod"

export const MethodologieData = z.object({
  name: z.string(),
})
export type IMethodologieData = z.infer<typeof MethodologieData>


export const MethodologieEntity = MethodologieData.extend({
  id: z.number()
})
export type IMethodologieEntity = z.infer<typeof MethodologieEntity>
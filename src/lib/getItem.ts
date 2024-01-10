import { useGetByIdQuery } from "@/lib/redux/services/movies";
import { cache } from 'react'
export const GetData = cache(async (id: number) => {
    const item = await useGetByIdQuery(id)
    return item
})
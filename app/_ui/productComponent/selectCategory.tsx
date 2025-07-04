import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Category } from '@/reactQuery/types'
import { ChangeValueCategory } from '@/redux/counterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import React, { FC } from 'react'

const SelectCategory:FC<{categories:Array<Category>}> = ({categories}) => {
const {valueCategory} = useAppSelector(state=> state.NavSlice)
 const Dispatch = useAppDispatch()
  return (
    <div className='w-[95%] bg-white px-2 py-3.5 rounded-xl md:min-h-1/2 '>
         <h2 className='text-slate-700 font-bold text-[12px] md:text-sm p-1 my-2'>Categories</h2>
            <Select value={valueCategory} onValueChange={(val) => Dispatch(ChangeValueCategory(val))} >
      <SelectTrigger className="w-full">
        <SelectValue  placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent >
        <SelectGroup >
          <SelectItem value="all">all</SelectItem>
            {categories?.map((item,idx)=>{
                return  <SelectItem key={idx} value={item.name}>{item.name}</SelectItem>
            })}
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}

export default SelectCategory

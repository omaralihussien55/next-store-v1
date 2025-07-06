"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"
import { FC } from "react"
import { Order } from "@/reactQuery/types"

const FormSchema = z.object({
  type: z.enum(["CreditCard", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

const  PayMent:FC<{newOrder:Order}>= ({newOrder})=> {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

console.log("new",newOrder)
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/4 space-y-6 mx-auto">
        <FormField
        defaultValue="CreditCard"
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3 w-full ">
              {/* <FormLabel>Notify me about...</FormLabel> */}
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col w-full accent-pink-600"
                >
                  <FormItem className="flex items-center gap-3 mb-2 bg-green-600 text-white p-3 rounded-xl ">
                    <FormControl>
                      <RadioGroupItem value="CreditCard" className=""/>
                    </FormControl>
                    <FormLabel className="font-normal">
                      Credit Card 
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex pointer-events-none items-center gap-3 mb-2 bg-gray-100 p-3 rounded-xl">
                    <FormControl>
                      <RadioGroupItem value="mentions" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Paypal
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center pointer-events-none gap-3 mb-2 bg-gray-100 p-3 rounded-xl">
                    <FormControl>
                      <RadioGroupItem value="none" />
                    </FormControl>
                    <FormLabel className="font-normal">Google Pay</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    <div className="flex items-center justify-between gap-2">
        <span className="text-gray-400">id</span>
        <span className="text-gray-900 font-bold"># {newOrder?.id}</span>
      </div>

       <div className="flex items-center justify-between gap-2">
        <span className="text-gray-400">discount</span>
        <span className="text-gray-900 font-bold">${(newOrder?.total && newOrder?.discountedTotal) && (newOrder?.total - newOrder?.discountedTotal).toFixed(2)}</span>
      </div>

             <div className="flex items-center justify-between gap-2">
        <span className="text-gray-400">Total</span>
        <span className="text-gray-900 font-bold">${newOrder?.total?.toFixed(2)}</span>
      </div>
      </form>

    
    </Form>
  )
}

export default PayMent
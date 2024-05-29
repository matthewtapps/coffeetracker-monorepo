import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Card } from "../ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "../ui/calendar"


const formSchema = z.object({
    beans: z.string(),
    roaster: z.string(),
    roastDate: z.date(),
    shotDate: z.date(),
    grindSetting: z.number(),
    brewTimeSeconds: z.number(),
    weightInGrams: z.number(),
    weightOutGrams: z.number(),
    notes: z.string(),
})

export default function EspressoShotForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            beans: "",
            roaster: "",
            roastDate: new Date(),
            shotDate: new Date(),
            grindSetting: 10,
            brewTimeSeconds: 30,
            weightInGrams: 18,
            weightOutGrams: 45,
            notes: "",
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Card className="border m-2 p-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="beans"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bean Origin</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bean Origin" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roaster"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Roaster</FormLabel>
                                <FormControl>
                                    <Input placeholder="Roaster" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="roastDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Roast Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="shotDate"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Shot Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                            >
                                                {field.value ? (
                                                    format(field.value, "PPP")
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="grindSetting"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Grind Setting</FormLabel>
                                <FormControl>
                                    <Input placeholder="Grind Setting" type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="brewTimeSeconds"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Brew Time (s)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Brew Time (s)" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weightInGrams"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight In (g)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Weight In (g)" type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weightOutGrams"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight Out (g)</FormLabel>
                                <FormControl>
                                    <Input placeholder="Weight Out (g)" type="number" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Weight In (g)</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Shot notes" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </Card>
    )
}

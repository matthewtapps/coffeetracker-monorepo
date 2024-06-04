import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Slider } from "@/components/ui/sliderSelector";
import { useGetLatestShotQuery, useAddShotMutation } from "@/app/api/api";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Spinner from "../loadingSpinner";
import { DialogTitle } from "@radix-ui/react-dialog";

const formSchema = z.object({
  beans: z.string(),
  roaster: z.string(),
  roastDate: z.date(),
  shotDate: z.date(),
  grindSetting: z.number(),
  brewTimeSeconds: z.number(),
  acidityBitterness: z.number(),
  muddyWatery: z.number(),
  weightInGrams: z.number(),
  weightOutGrams: z.number(),
  notes: z.string(),
  rating: z.number(),
});

export default function EspressoShotForm() {
  const { data: latestShot } = useGetLatestShotQuery();
  const [postShot, { isLoading: isUpdating }] = useAddShotMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beans: latestShot?.beans || "",
      roaster: latestShot?.roaster || "",
      roastDate: latestShot?.roastDate || new Date(),
      shotDate: new Date(),
      grindSetting: latestShot?.grindSetting || 10,
      brewTimeSeconds: latestShot?.brewTimeSeconds || 30,
      acidityBitterness: 0,
      muddyWatery: 0,
      weightInGrams: 18,
      weightOutGrams: 45,
      rating: 5,
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    postShot(values);
  }

  const [beanOriginEditable, editBeanOrigin] = React.useState(
    latestShot?.beans === "",
  );
  const [roasterEditable, editRoaster] = React.useState(
    latestShot?.roaster === "",
  );
  const [roastDateEditable, editRoastDate] = React.useState(
    !latestShot?.roastDate,
  );

  return (
    <div className="m-3">
      <Dialog open={isUpdating}>
        <Tabs defaultValue="espressoShot">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="flex flex-col">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="espressoShot">Espresso Shot</TabsTrigger>
                  <TabsTrigger value="beans">Beans</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                </TabsList>
                <TabsContent value="espressoShot" className="space-y-2">
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
                                  !field.value && "text-muted-foreground",
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="grindSetting"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Grind Setting</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Grind Setting"
                              type="number"
                              step="0.1"
                              {...field}
                            />
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
                            <Input
                              placeholder="Brew Time (s)"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name="weightInGrams"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight In (g)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Weight In (g)"
                              type="number"
                              step="0.1"
                              {...field}
                            />
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
                            <Input
                              placeholder="Weight Out (g)"
                              type="number"
                              step="0.1"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="acidityBitterness"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex justify-between py-1">
                            <span>Sour</span>
                            <span>Balanced</span>
                            <span>Bitter</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[0]}
                            max={5}
                            min={-5}
                            step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="muddyWatery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex justify-between py-1">
                            <span>Muddy</span>
                            <span>Clear</span>
                            <span>Watery</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[0]}
                            max={5}
                            min={-5}
                            step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          <div className="flex justify-between py-1">
                            <span>Bad</span>
                            <span>Good</span>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Slider
                            defaultValue={[5]}
                            max={10}
                            min={0}
                            step={1}
                            value={[field.value]}
                            onValueChange={(v) => field.onChange(v[0])}
                          />
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
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Shot Notes" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="beans" className="space-y-2">
                  <FormField
                    control={form.control}
                    name="beans"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bean Origin</FormLabel>
                        <FormControl>
                          <div className="flex space-x-3">
                            <Input
                              placeholder="Bean Origin"
                              disabled={!beanOriginEditable}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="default"
                              onClick={() => {
                                editBeanOrigin(true);
                                setTimeout(
                                  () =>
                                    form.setFocus("beans", {
                                      shouldSelect: true,
                                    }),
                                  10,
                                );
                              }}
                            >
                              New
                            </Button>
                          </div>
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
                          <div className="flex space-x-3">
                            <Input
                              placeholder="Roaster"
                              disabled={!roasterEditable}
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="default"
                              onClick={() => {
                                editRoaster(true);
                                setTimeout(
                                  () =>
                                    form.setFocus("roaster", {
                                      shouldSelect: true,
                                    }),
                                  10,
                                );
                              }}
                            >
                              New
                            </Button>
                          </div>
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
                              <div className="flex space-x-3">
                                <Button
                                  type="button"
                                  variant={"outline"}
                                  disabled={!roastDateEditable}
                                  className={cn(
                                    "pl-3 text-left font-normal flex-grow",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="default"
                                  onClick={() => {
                                    editRoastDate(true);
                                    setTimeout(
                                      () =>
                                        form.setFocus("roastDate", {
                                          shouldSelect: true,
                                        }),
                                      10,
                                    );
                                  }}
                                >
                                  New
                                </Button>
                              </div>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>
                <TabsContent value="equipment" className="space-y-2">
                  <h1>TBD</h1>
                </TabsContent>
                <Button type="submit" className="flex-grow mt-3">
                  <DialogTrigger>Submit</DialogTrigger>
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
        <DialogContent className="flex-grow flex-row">
          <DialogTitle>Submitting shot...</DialogTitle>
          <Spinner />
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
import { useAddShotMutation } from "@/app/api/api";
import { Dialog, DialogContent } from "../ui/dialog";
import Spinner from "../loading-spinner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Coffee } from "../coffee-data-table/columns";
import { useToast } from "../ui/use-toast";
import { Toaster } from "../ui/toaster";

const formSchema = z.object({
  beans: z.string().optional(),
  roaster: z.string().optional(),
  roastDate: z.date().optional(),
  shotDate: z.date().optional(),
  grindSetting: z.number().optional(),
  brewTimeSeconds: z.number().min(0, "Please enter a valid brew time"),
  acidityBitterness: z.number(),
  muddyWatery: z.number(),
  weightInGrams: z.number().min(0, "Please enter a valid weight"),
  weightOutGrams: z.number().min(0, "Please enter a valid weight"),
  notes: z.string().optional(),
  rating: z.number(),
});

interface EspressoShotFormProps {
  latestShot: Coffee | null;
}

export default function EspressoShotForm({
  latestShot,
}: EspressoShotFormProps) {
  const { toast } = useToast();
  const [postShot, { isLoading: isUpdating }] = useAddShotMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beans: latestShot?.beans || "",
      roaster: latestShot?.roaster || "",
      roastDate: latestShot?.roastDate ? new Date(latestShot.roastDate) : undefined,
      grindSetting: latestShot?.grindSetting || undefined,
      brewTimeSeconds: latestShot?.brewTimeSeconds || 30,
      acidityBitterness: latestShot?.acidityBitterness || 0,
      muddyWatery: latestShot?.muddyWatery || 0,
      weightInGrams: latestShot?.weightInGrams || 18,
      weightOutGrams: latestShot?.weightOutGrams || 36,
      rating: latestShot?.rating || 5,
      notes: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const [activeTab, setActiveTab] = React.useState("espressoShot");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await postShot(values).unwrap();
      form.reset();
      toast({
        title: "Success!",
        description: "Espresso shot recorded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record espresso shot",
        variant: "destructive",
      });
    }
  }

  const [shotDateEditable, editShotDate] = React.useState(false);
  const [beanOriginEditable, editBeanOrigin] = React.useState(
    !latestShot?.beans,
  );
  const [roasterEditable, editRoaster] = React.useState(!latestShot?.roaster);
  const [roastDateEditable, editRoastDate] = React.useState(
    !latestShot?.roastDate,
  );

  React.useEffect(() => {
    const errors = form.formState.errors;
    if (errors.beans || errors.roaster || errors.roastDate) {
      setActiveTab("beans");
    } else {
      setActiveTab("espressoShot");
    }
  }, [form.formState.errors]);

  const handleDaySelect = (date: Date | undefined, formSelectHandler: (e: any) => void) => {
    if (!date) {
      formSelectHandler(date)
      return
    }
    const now = new Date()
    const dateWithTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
    formSelectHandler(dateWithTime)
  };

  return (
    <div className="m-3">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                        <div className="flex space-x-2">
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                disabled={!shotDateEditable}
                                className={cn(
                                  "pl-3 text-left font-normal flex-grow",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Now</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <Button
                            type="button"
                            variant="default"
                            onClick={() => {
                              editShotDate(true);
                              form.setFocus("shotDate", {
                                shouldSelect: true,
                              });
                            }}
                          >
                            Edit
                          </Button>
                        </div>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value): void => {
                              handleDaySelect(value, field.onChange)
                            }}
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
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="grindSetting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Grind Setting</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            onBlur={(e) => {
                              if (e.target.valueAsNumber > 0) {
                                field.onChange(e.target.valueAsNumber);
                              }
                            }}
                            placeholder="Grind Setting"
                            type="number"
                            step="0.1"
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
                            {...field}
                            onBlur={(e) => {
                              if (e.target.valueAsNumber > 0) {
                                field.onChange(e.target.valueAsNumber);
                              }
                            }}
                            placeholder="Brew Time (s)"
                            type="number"
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
                            {...field}
                            onBlur={(e) => {
                              if (e.target.valueAsNumber > 0) {
                                field.onChange(e.target.valueAsNumber);
                              }
                            }}
                            placeholder="Weight In (g)"
                            type="number"
                            step="0.1"
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
                            {...field}
                            onBlur={(e) => {
                              if (e.target.valueAsNumber > 0) {
                                field.onChange(e.target.valueAsNumber);
                              }
                            }}
                            placeholder="Weight Out (g)"
                            type="number"
                            step="0.1"
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
                        <Textarea
                          className="overflow-y-hidden"
                          placeholder={
                            latestShot?.notes
                              ? `Previous notes:\n${latestShot.notes}`
                              : ""
                          }
                          {...field}
                        />
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
                        <div className="flex space-x-2">
                          <FormControl>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                disabled={!roastDateEditable}
                                variant={"outline"}
                                className={cn(
                                  "pl-3 text-left font-normal flex-grow",
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                          </FormControl>
                          <Button
                            type="button"
                            variant="default"
                            onClick={() => {
                              editRoastDate(true);
                              form.setFocus("roastDate", {
                                shouldSelect: true,
                              });
                            }}
                          >
                            New
                          </Button>
                        </div>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(value): void => {
                              handleDaySelect(value, field.onChange)
                            }}
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
              </TabsContent>
              <TabsContent value="equipment" className="space-y-2">
                <h1>TBD</h1>
              </TabsContent>
              <Button className="flex-grow mt-3" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
      <Dialog open={isUpdating}>
        <DialogContent className="flex-grow flex-row">
          <DialogTitle>Submitting shot...</DialogTitle>
          <Spinner />
        </DialogContent>
      </Dialog>
      <Toaster />
    </div >
  );
}

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useServerFn } from "@tanstack/react-start";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useInView } from "@/hooks/use-in-view";
import {
  startupApplicationDefaultValues,
  startupApplicationSchema,
  startupStages,
  stepFieldNames,
  type StartupApplicationFormValues,
} from "@/features/startup-application/schema";
import { submitStartupApplication } from "@/features/startup-application/server";

const steps = [
  {
    eyebrow: "Step 1",
    title: "Founder details",
    description: "Tell us who is applying so we know who to contact and who will be in the room.",
  },
  {
    eyebrow: "Step 2",
    title: "Startup overview",
    description: "Give us the essential context we need before we bring your challenge to the table.",
  },
  {
    eyebrow: "Step 3",
    title: "Your Winestorming application",
    description: "Focus on the challenge itself so we can curate a discussion that is worth your time.",
  },
] as const;

function revealStyle(inView: boolean, delay: number): React.CSSProperties {
  return {
    animation: inView
      ? `ws-reveal 0.7s cubic-bezier(0.2,0.7,0.2,1) ${delay}s both`
      : undefined,
    opacity: inView ? undefined : 0,
  };
}

function getSubmissionError(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "Something went wrong while submitting your application. Please try again.";
}

export function StartupApplicationSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });
  const [currentStep, setCurrentStep] = React.useState(0);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submittedStartup, setSubmittedStartup] = React.useState<string | null>(null);

  const form = useForm<StartupApplicationFormValues>({
    resolver: zodResolver(startupApplicationSchema),
    defaultValues: startupApplicationDefaultValues,
    mode: "onTouched",
  });
  const submitApplication = useServerFn(submitStartupApplication);

  const isLastStep = currentStep === steps.length - 1;
  const isSubmitting = form.formState.isSubmitting;

  const goToStep = React.useCallback(async (stepIndex: number) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
      return;
    }

    const isValid = await form.trigger(stepFieldNames[currentStep], { shouldFocus: true });
    if (isValid) {
      setCurrentStep(stepIndex);
    }
  }, [currentStep, form]);

  const handleNext = React.useCallback(async () => {
    const isValid = await form.trigger(stepFieldNames[currentStep], { shouldFocus: true });
    if (isValid) {
      setCurrentStep((step) => Math.min(step + 1, steps.length - 1));
    }
  }, [currentStep, form]);

  const handleBack = React.useCallback(() => {
    setCurrentStep((step) => Math.max(step - 1, 0));
  }, []);

  const onSubmit = form.handleSubmit(async (values) => {
    setSubmitError(null);

    try {
      await submitApplication({ data: values });
      setSubmittedStartup(values.startup_name);
      form.reset(startupApplicationDefaultValues);
      setCurrentStep(0);
    } catch (error) {
      setSubmitError(getSubmissionError(error));
    }
  });

  return (
    <section id="apply" className="relative w-full px-6 py-20 md:py-28">
      <div ref={ref} className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="font-body text-xs uppercase tracking-[0.32em] text-wine"
            style={revealStyle(inView, 0.08)}
          >
            Startup application
          </p>
          <h2
            className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-deep-wine md:text-6xl"
            style={revealStyle(inView, 0.16)}
          >
            <span className="block">bring a real challenge.</span>
            <span className="block italic text-wine">leave with sharper next steps.</span>
          </h2>
          <p
            className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-charcoal/70 md:text-lg"
            style={revealStyle(inView, 0.24)}
          >
            This application helps us curate the room and prepare a conversation
            that can genuinely move your startup forward.
          </p>
        </div>

        <div
          className="mt-14 overflow-hidden rounded-[2rem] border border-wine/15 bg-cream/85 shadow-[0_30px_80px_-36px_color-mix(in_oklab,var(--wine)_45%,transparent)] backdrop-blur-sm md:mt-18"
          style={revealStyle(inView, 0.32)}
        >
          <div className="border-b border-wine/10 px-6 py-8 md:px-10">
            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step, index) => {
                const isActive = index === currentStep;
                const isComplete = index < currentStep;

                return (
                  <button
                    key={step.title}
                    type="button"
                    onClick={() => void goToStep(index)}
                    className={`rounded-3xl border px-5 py-5 text-left transition-all duration-300 ${
                      isActive
                        ? "border-wine/35 bg-wine/[0.06] shadow-[0_18px_48px_-36px_color-mix(in_oklab,var(--wine)_60%,transparent)]"
                        : isComplete
                          ? "border-wine/20 bg-white/60 hover:border-wine/35"
                          : "border-wine/10 bg-white/35 hover:border-wine/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium ${
                          isActive || isComplete
                            ? "border-wine bg-wine text-cream"
                            : "border-wine/20 text-wine"
                        }`}
                      >
                        {isComplete ? <CheckCircle2 className="h-4 w-4" /> : `0${index + 1}`}
                      </span>
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-wine/65">
                          {step.eyebrow}
                        </p>
                        <h3 className="mt-1 font-display text-xl text-deep-wine">{step.title}</h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-[0.95fr_1.4fr]">
            <aside className="border-b border-wine/10 bg-wine/[0.03] px-6 py-8 md:border-b-0 md:border-r md:px-10">
              <p className="text-xs uppercase tracking-[0.3em] text-wine/75">
                {steps[currentStep].eyebrow}
              </p>
              <h3 className="mt-4 font-display text-3xl text-deep-wine md:text-4xl">
                {steps[currentStep].title}
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/70">
                {steps[currentStep].description}
              </p>

              <div className="mt-10 rounded-3xl border border-wine/10 bg-white/60 p-5">
                <p className="text-xs uppercase tracking-[0.22em] text-wine/70">
                  Before you submit
                </p>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
                  Be concrete. The sharper your challenge and questions are, the easier it is for
                  us to curate the right conversation around them.
                </p>
              </div>
            </aside>

            <div className="px-6 py-8 md:px-10 md:py-10">
              {submittedStartup ? (
                <div className="mb-8 rounded-3xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-emerald-900">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none" />
                    <div>
                      <p className="font-medium">Application received for {submittedStartup}.</p>
                      <p className="mt-1 text-sm text-emerald-800/90">
                        We will review it and get back to you with the next steps.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {submitError ? (
                <div className="mb-8 rounded-3xl border border-destructive/20 bg-destructive/5 px-5 py-4 text-sm text-destructive">
                  {submitError}
                </div>
              ) : null}

              <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-8">
                  <div className={currentStep === 0 ? "space-y-6" : "hidden"}>
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="Alex" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Popescu" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="alex@startup.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="+40 7xx xxx xxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="linkedin_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>LinkedIn profile</FormLabel>
                          <FormControl>
                            <Input placeholder="linkedin.com/in/your-name" {...field} />
                          </FormControl>
                          <FormDescription>
                            Paste the full profile link or just the LinkedIn path. We will normalize
                            it.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={currentStep === 1 ? "space-y-6" : "hidden"}>
                    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                      <FormField
                        control={form.control}
                        name="startup_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Startup name</FormLabel>
                            <FormControl>
                              <Input placeholder="Winestorming Labs" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="current_stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current stage</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your current stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {startupStages.map((stage) => (
                                  <SelectItem key={stage} value={stage}>
                                    {stage}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="website_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website</FormLabel>
                          <FormControl>
                            <Input placeholder="winestorming.eu" {...field} />
                          </FormControl>
                          <FormDescription>
                            Paste the public website or landing page that best represents the startup.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startup_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What does your startup do?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Describe what you are building in a few clear sentences."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="target_customer"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Who is your target customer?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Tell us who this is for, and who feels the problem most strongly."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={currentStep === 2 ? "space-y-6" : "hidden"}>
                    <FormField
                      control={form.control}
                      name="main_challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What is the main challenge you want help with?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Describe the decision, bottleneck, or uncertainty you want the room to help you refine."
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="questions_for_room"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>What are up to 3 questions you want the room to help you answer?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder={"1. ...\n2. ...\n3. ..."}
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Keep each question on its own line so we can review them quickly.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="available_for_event"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>Will you be available for the event?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              className="grid gap-3 sm:grid-cols-2"
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <div className="flex items-center gap-3 rounded-2xl border border-wine/15 bg-white/60 px-4 py-4">
                                <RadioGroupItem value="yes" id="available-yes" />
                                <Label htmlFor="available-yes" className="cursor-pointer">
                                  Yes, I can attend on 15 June 2026 in Bucharest
                                </Label>
                              </div>
                              <div className="flex items-center gap-3 rounded-2xl border border-wine/15 bg-white/60 px-4 py-4">
                                <RadioGroupItem value="no" id="available-no" />
                                <Label htmlFor="available-no" className="cursor-pointer">
                                  No, I cannot attend that date
                                </Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="additional_notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Anything else we should know?</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={4}
                              placeholder="Optional. Add anything that would help us understand the context better."
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is the only optional field in the application.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex flex-col gap-4 border-t border-wine/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-charcoal/60">
                      Step {currentStep + 1} of {steps.length}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0 || isSubmitting}
                        className="gap-2 rounded-full px-6"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </Button>

                      {isLastStep ? (
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="gap-2 rounded-full bg-wine px-6 text-cream hover:bg-deep-wine"
                        >
                          {isSubmitting ? (
                            <>
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              Submit application
                              <ArrowRight className="h-4 w-4" />
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => void handleNext()}
                          disabled={isSubmitting}
                          className="gap-2 rounded-full bg-wine px-6 text-cream hover:bg-deep-wine"
                        >
                          Next
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, PoundSterling, CheckCircle2 } from "lucide-react";
import { format, addMonths, addWeeks, subWeeks, differenceInMonths, parseISO } from "date-fns";

interface PaymentCalculatorProps {
  tourPrice: number;
  departureDate: string; // ISO date string
  tourName: string;
  departureDateLabel: string; // Human-readable label e.g. "1st - 21st April 2026"
}

interface PaymentSchedule {
  date: string;
  amount: number;
  description: string;
}

function PaymentScheduleContent({
  tourPrice,
  departureDate,
  departureDateLabel,
}: {
  tourPrice: number;
  departureDate: string;
  departureDateLabel: string;
}) {
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);
  const [finalPaymentDate, setFinalPaymentDate] = useState<string>("");
  const [monthsAvailable, setMonthsAvailable] = useState<number>(0);

  useEffect(() => {
    calculatePaymentSchedule();
  }, [tourPrice, departureDate]);

  const calculatePaymentSchedule = () => {
    const today = new Date();
    const departure = parseISO(departureDate);

    // Final payment must be 4 weeks before departure
    const finalPayment = subWeeks(departure, 4);
    setFinalPaymentDate(format(finalPayment, "do MMMM yyyy"));

    // Calculate months available for payment (from today to final payment date)
    const monthsToFinalPayment = differenceInMonths(finalPayment, today);
    setMonthsAvailable(monthsToFinalPayment);

    if (monthsToFinalPayment <= 0) {
      // If less than 4 weeks to departure, full payment required immediately
      setSchedule([
        {
          date: format(today, "do MMMM yyyy"),
          amount: tourPrice,
          description: "Full payment (less than 4 weeks to departure)",
        },
      ]);
      return;
    }

    const deposit = 60;
    const remainingBalance = tourPrice - deposit;

    // Calculate monthly installments
    const monthlyPayment = Math.ceil(remainingBalance / monthsToFinalPayment);

    const newSchedule: PaymentSchedule[] = [
      {
        date: format(today, "do MMMM yyyy"),
        amount: deposit,
        description: "Initial deposit to secure your spot",
      },
    ];

    // Add monthly payments
    for (let i = 1; i <= monthsToFinalPayment; i++) {
      const paymentDate = addMonths(today, i);
      const isLastPayment = i === monthsToFinalPayment;

      // Last payment gets any remaining balance due to rounding
      const amount = isLastPayment
        ? remainingBalance - monthlyPayment * (monthsToFinalPayment - 1)
        : monthlyPayment;

      newSchedule.push({
        date: format(paymentDate, "do MMMM yyyy"),
        amount: amount,
        description: isLastPayment ? "Final payment" : `Monthly payment ${i}`,
      });
    }

    setSchedule(newSchedule);
  };

  const totalPaid = schedule.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <>
      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 pb-2 space-y-5">
        {/* Summary card */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/15 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Departure</span>
            <span className="font-semibold text-sm text-right max-w-[55%]">{departureDateLabel}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground font-medium">Tour price</span>
            <span className="text-2xl font-bold text-primary">{`£${tourPrice}`}</span>
          </div>
          {monthsAvailable > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground font-medium">Spread over</span>
              <span className="font-semibold text-sm">
                {monthsAvailable} {monthsAvailable === 1 ? "month" : "months"}
              </span>
            </div>
          )}
          <div className="flex items-start gap-2 pt-2 border-t border-primary/10">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-sm font-medium">
                Final payment: <span className="text-primary font-bold">{finalPaymentDate}</span>
              </span>
              <p className="text-xs text-muted-foreground mt-0.5">4 weeks before departure</p>
            </div>
          </div>
        </div>

        {/* Payment schedule */}
        <div className="space-y-2">
          <h4 className="font-bold text-xs text-muted-foreground uppercase tracking-widest">
            Your Payment Schedule
          </h4>
          <div className="space-y-2">
            {schedule.map((payment, index) => (
              <div
                key={index}
                className={`flex justify-between items-start p-3.5 rounded-xl border-2 ${
                  index === 0
                    ? "bg-primary/8 border-primary/30"
                    : index === schedule.length - 1
                    ? "bg-accent/8 border-accent/30"
                    : "bg-muted/30 border-border"
                }`}
              >
                <div className="flex items-start gap-2.5 flex-1">
                  <CheckCircle2
                    className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                      index === 0 ? "text-primary" : index === schedule.length - 1 ? "text-accent" : "text-muted-foreground/50"
                    }`}
                  />
                  <div>
                    <p className="font-semibold text-sm">{payment.description}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{payment.date}</p>
                  </div>
                </div>
                <span className="font-bold text-base ml-3 flex-shrink-0">{`£${payment.amount}`}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center py-3 border-t-2 border-dashed border-border">
          <span className="font-bold text-base">Total</span>
          <span className="text-2xl font-bold text-primary">{`£${totalPaid}`}</span>
        </div>

        <p className="text-xs text-muted-foreground pb-2">
          * Illustrative schedule. Actual dates may vary based on booking date. Full payment due 4 weeks before departure.
        </p>
      </div>

      {/* Sticky footer CTA */}
      <div className="px-6 py-4 border-t border-border bg-background flex-shrink-0">
        <a
          href="https://booking.acetravelexperiences.com/book/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base rounded-xl shadow-lg shadow-primary/20">
            Book Now — Secure with £60 deposit
          </Button>
        </a>
      </div>
    </>
  );
}

export function PaymentCalculator({
  tourPrice,
  departureDate,
  tourName,
  departureDateLabel,
}: PaymentCalculatorProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-primary border-primary/40 hover:bg-primary/5 hover:border-primary"
        >
          <PoundSterling className="w-3.5 h-3.5" />
          View Payment Plan
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-0 gap-0">
        <DialogHeader className="px-6 pt-6 pb-4 flex-shrink-0 border-b border-border">
          <DialogTitle className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <PoundSterling className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-base font-bold">Payment Plan</div>
              <div className="text-xs text-muted-foreground font-normal mt-0.5">{tourName}</div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <PaymentScheduleContent
          tourPrice={tourPrice}
          departureDate={departureDate}
          departureDateLabel={departureDateLabel}
        />
      </DialogContent>
    </Dialog>
  );
}

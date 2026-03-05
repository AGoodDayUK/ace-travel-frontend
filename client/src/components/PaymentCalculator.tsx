import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, PoundSterling } from "lucide-react";
import { format, addMonths, differenceInMonths, parseISO } from "date-fns";

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

    // Final payment must be 2 months before departure
    const finalPayment = addMonths(departure, -2);
    setFinalPaymentDate(format(finalPayment, "do MMMM yyyy"));

    // Calculate months available for payment (from today to final payment date)
    const monthsToFinalPayment = differenceInMonths(finalPayment, today);
    setMonthsAvailable(monthsToFinalPayment);

    if (monthsToFinalPayment <= 0) {
      // If less than 2 months to departure, full payment required immediately
      setSchedule([
        {
          date: format(today, "do MMMM yyyy"),
          amount: tourPrice,
          description: "Full payment (less than 2 months to departure)",
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
    <div className="space-y-5">
      {/* Header info */}
      <div className="bg-muted/40 rounded-lg p-4 space-y-2">
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">Departure</span>
          <span className="font-semibold text-sm">{departureDateLabel}</span>
        </div>
        <div className="flex justify-between items-baseline">
          <span className="text-sm text-muted-foreground">Total tour price</span>
          <span className="text-2xl font-bold text-primary">£{tourPrice.toLocaleString()}</span>
        </div>
        {monthsAvailable > 0 && (
          <div className="flex justify-between items-baseline">
            <span className="text-sm text-muted-foreground">Spread over</span>
            <span className="font-semibold">
              {monthsAvailable} {monthsAvailable === 1 ? "month" : "months"}
            </span>
          </div>
        )}
        <div className="flex items-center gap-2 pt-1 border-t border-border">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm font-medium">
            Final payment due: <span className="text-primary">{finalPaymentDate}</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground ml-6">(2 months before departure)</p>
      </div>

      {/* Payment schedule */}
      <div className="space-y-2">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Payment Schedule
        </h4>
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {schedule.map((payment, index) => (
            <div
              key={index}
              className={`flex justify-between items-start p-3 rounded-lg border ${
                index === 0
                  ? "bg-primary/10 border-primary/30"
                  : index === schedule.length - 1
                  ? "bg-accent/10 border-accent/30"
                  : "bg-muted/30 border-border"
              }`}
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{payment.description}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{payment.date}</p>
              </div>
              <span className="font-bold text-base ml-4">£{payment.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">£{totalPaid.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          * Payment schedule is illustrative. Actual dates may vary based on your booking date.
          Full payment must be received 2 months before departure.
        </p>
        <a
          href="https://booking.acetravelexperiences.com/book/"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-12 text-base">
            Book Now — Secure with £60 deposit
          </Button>
        </a>
      </div>
    </div>
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
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PoundSterling className="w-5 h-5 text-primary" />
            Payment Plan — {tourName}
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

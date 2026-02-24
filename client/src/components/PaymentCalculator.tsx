import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";
import { format, addMonths, differenceInMonths, parseISO } from "date-fns";

interface PaymentCalculatorProps {
  tourPrice: number;
  departureDate: string; // ISO date string
  tourName: string;
}

interface PaymentSchedule {
  date: string;
  amount: number;
  description: string;
}

export function PaymentCalculator({ tourPrice, departureDate, tourName }: PaymentCalculatorProps) {
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
      // If less than 2 months, full payment required immediately
      setSchedule([
        {
          date: format(today, "do MMMM yyyy"),
          amount: tourPrice,
          description: "Full payment (less than 2 months to departure)"
        }
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
        description: "Initial deposit to secure your spot"
      }
    ];
    
    // Add monthly payments
    for (let i = 1; i <= monthsToFinalPayment; i++) {
      const paymentDate = addMonths(today, i);
      const isLastPayment = i === monthsToFinalPayment;
      
      // Last payment gets any remaining balance due to rounding
      const amount = isLastPayment 
        ? remainingBalance - (monthlyPayment * (monthsToFinalPayment - 1))
        : monthlyPayment;
      
      newSchedule.push({
        date: format(paymentDate, "do MMMM yyyy"),
        amount: amount,
        description: isLastPayment ? "Final payment" : `Monthly payment ${i}`
      });
    }
    
    setSchedule(newSchedule);
  };

  const totalPaid = schedule.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-bold">Payment Calculator</h3>
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-sm text-muted-foreground">Total tour price</span>
          <span className="text-2xl font-bold">£{tourPrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-baseline mb-4">
          <span className="text-sm text-muted-foreground">Spread over</span>
          <span className="text-lg font-semibold">{monthsAvailable} {monthsAvailable === 1 ? 'month' : 'months'}</span>
        </div>
        <div className="bg-muted/50 p-3 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">Final payment due: {finalPaymentDate}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 ml-6">
            (2 months before departure)
          </p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
          Payment Schedule
        </h4>
        {schedule.map((payment, index) => (
          <div 
            key={index} 
            className={`flex justify-between items-start p-3 rounded-lg border ${
              index === 0 
                ? 'bg-primary/10 border-primary/20' 
                : index === schedule.length - 1
                ? 'bg-accent/10 border-accent/20'
                : 'bg-muted/30 border-border'
            }`}
          >
            <div className="flex-1">
              <p className="font-medium text-sm">{payment.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{payment.date}</p>
            </div>
            <span className="font-bold text-lg">£{payment.amount}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total</span>
          <span className="text-2xl font-bold text-primary">£{totalPaid.toLocaleString()}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          * Payment schedule is illustrative. Actual dates may vary based on booking date. 
          Full payment must be received 2 months before departure.
        </p>
      </div>
    </Card>
  );
}

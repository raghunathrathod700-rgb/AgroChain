import { useState } from "react";
import { Wallet, IndianRupee, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, CreditCard, History, Download } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";

interface Transaction {
  id: number;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  status: "completed" | "pending" | "failed";
  orderId?: string;
}

export function WalletPage() {
  const [walletBalance] = useState(45000);
  const [addMoneyAmount, setAddMoneyAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const [transactions] = useState<Transaction[]>([
    {
      id: 1,
      type: "credit",
      amount: 25000,
      description: "Advance payment received - Mango Order #MO-2345",
      date: "2026-03-22 10:30 AM",
      status: "completed",
      orderId: "MO-2345"
    },
    {
      id: 2,
      type: "debit",
      amount: 15000,
      description: "Payment to Rajesh Kumar - Apple Order #AP-1234",
      date: "2026-03-21 02:15 PM",
      status: "completed",
      orderId: "AP-1234"
    },
    {
      id: 3,
      type: "credit",
      amount: 35000,
      description: "Advance payment received - Orange Order #OR-5678",
      date: "2026-03-20 11:45 AM",
      status: "completed",
      orderId: "OR-5678"
    },
    {
      id: 4,
      type: "debit",
      amount: 8000,
      description: "Platform fee deduction",
      date: "2026-03-19 09:00 AM",
      status: "completed"
    },
    {
      id: 5,
      type: "credit",
      amount: 18000,
      description: "Advance payment received - Banana Order #BA-9012",
      date: "2026-03-18 04:20 PM",
      status: "pending",
      orderId: "BA-9012"
    },
  ]);

  const handleAddMoney = () => {
    if (addMoneyAmount) {
      alert(`Adding ₹${addMoneyAmount} to your wallet. Redirecting to payment gateway...`);
      setAddMoneyAmount("");
    }
  };

  const handleWithdraw = () => {
    if (withdrawAmount) {
      alert(`Withdrawing ₹${withdrawAmount} from your wallet. Processing...`);
      setWithdrawAmount("");
    }
  };

  const totalCredit = transactions
    .filter(t => t.type === "credit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === "debit" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            AgroChain Wallet
          </h1>
          <p className="text-gray-600">Manage your payments and transactions securely</p>
        </div>

        {/* Wallet Balance Card */}
        <Card className="mb-8 bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 border-0 text-white shadow-2xl">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-green-100 mb-2 flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Available Balance
                </p>
                <h2 className="text-5xl font-bold flex items-center gap-2">
                  <IndianRupee className="h-10 w-10" />
                  {walletBalance.toLocaleString('en-IN')}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-green-100 mb-2">Wallet ID</p>
                <p className="text-xl font-semibold">AC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-green-400/30">
              <div>
                <p className="text-green-100 text-sm mb-1 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Total Credit
                </p>
                <p className="text-2xl font-semibold">₹{totalCredit.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1 flex items-center gap-1">
                  <TrendingDown className="h-4 w-4" />
                  Total Debit
                </p>
                <p className="text-2xl font-semibold">₹{totalDebit.toLocaleString('en-IN')}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Add Money */}
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <ArrowDownLeft className="h-5 w-5" />
                Add Money
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Enter Amount (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={addMoneyAmount}
                    onChange={(e) => setAddMoneyAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setAddMoneyAmount("5000")}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    ₹5,000
                  </Button>
                  <Button
                    onClick={() => setAddMoneyAmount("10000")}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    ₹10,000
                  </Button>
                  <Button
                    onClick={() => setAddMoneyAmount("25000")}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    ₹25,000
                  </Button>
                </div>
                <Button
                  onClick={handleAddMoney}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Add Money to Wallet
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Withdraw Money */}
          <Card className="shadow-lg border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <ArrowUpRight className="h-5 w-5" />
                Withdraw Money
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Enter Amount (₹)
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Withdrawals are processed to your linked bank account within 1-2 business days.
                </p>
                <Button
                  onClick={handleWithdraw}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw to Bank
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transaction History */}
        <Card className="shadow-lg border-green-200">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <History className="h-5 w-5" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="credit">Credit</TabsTrigger>
                <TabsTrigger value="debit">Debit</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === "credit"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft className="h-6 w-6" />
                        ) : (
                          <ArrowUpRight className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.date}</p>
                        {transaction.orderId && (
                          <p className="text-xs text-gray-500">Order ID: {transaction.orderId}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xl font-bold ${
                          transaction.type === "credit" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "credit" ? "+" : "-"}₹
                        {transaction.amount.toLocaleString('en-IN')}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="credit" className="space-y-3">
                {transactions
                  .filter((t) => t.type === "credit")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                          <ArrowDownLeft className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-green-600">
                        +₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="debit" className="space-y-3">
                {transactions
                  .filter((t) => t.type === "debit")
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                          <ArrowUpRight className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{transaction.description}</p>
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <p className="text-xl font-bold text-red-600">
                        -₹{transaction.amount.toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

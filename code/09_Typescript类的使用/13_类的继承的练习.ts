enum PayType {
  weChat = 1,
  aLiYun = 2,
  bankPay = 3,
}

// 支付父类
class Pay {
  bankNumber: string;
  accountBalance: number;
  cost: number;

  constructor(bankNumber: string, accountBalance: number, cost: number) {
    this.bankNumber = bankNumber;
    this.accountBalance = accountBalance;
    this.cost = cost;
  }

  pay() {
    console.log("开始支付");
  }
}

class MobilePay extends Pay {
  userId: number;
  payType: PayType;

  constructor(
    bankNumber: string,
    accountBalance: number,
    cost: number,
    payType: PayType,
    userId: number
  ) {
    super(bankNumber, accountBalance, cost);

    this.payType = payType;
    this.userId = userId;
  }

  pay(): void {
    super.pay();

    console.log("支付完成");
  }
}

const mobilePay = new MobilePay("962865262", 500, 10, PayType.weChat, 12345678);

console.log(mobilePay);
mobilePay.pay();

export {};

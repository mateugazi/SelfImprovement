interface State {
    order: Order;

    cancelOrder();
    verifyPayment();
    shipOrder();
}

class Order {
    public cancelledOrderState: State;
    public paymentPendingState: State;
    public orderShipedState: State;
    public orderBeingPreparedState: State;

    public currentState: State;

    constructor() {
        this.cancelledOrderState = new CancelledOrderState(this);
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderShipedState = new OrderShippedState(this);
        this.orderBeingPreparedState = new OrderBeingPreparedState(this);

        this.setState(this.paymentPendingState);
    }

    setState(state: State) {
        this.currentState = state;
    }

    getState(): State {
        return this.currentState;
    }
}

class PaymentPendingState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder() {
        console.log('Cancelling your unpaid order...')
        this.order.setState(this.order.cancelledOrderState);
    }

    verifyPayment() {
        console.log('Payment verified! Shipping soon.')
        this.order.setState(this.order.orderBeingPreparedState);
    }

    shipOrder() {
        console.log('Cannot ship the order when payment is pending!')
    }
    
}

class CancelledOrderState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder() {
        console.log('Your order has already been cancelled');
    }

    verifyPayment() {
        console.log('Order cancelled, you cannot verify payment.');
    }

    shipOrder() {
        console.log('Order cannot ship, it was cancelled.');
    }
}

class OrderBeingPreparedState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder() {
        console.log('Cancelling your order... You will be refunded.');
        this.order.setState(this.order.cancelledOrderState);
    }
    verifyPayment() {
        console.log('Payment is already verified.');
    }
    shipOrder() {
        console.log('Shipping your order now...');
        this.order.setState(this.order.orderShipedState);
    }
}

class OrderShippedState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    cancelOrder() {
        console.log('You cannot cancel an order that has been shipped.');
    }
    verifyPayment() {
        console.log('Payment is already verified.');
    }
    shipOrder() {
        console.log('Order is already shipped.');
    }
}

let order = new Order();
order.getState().verifyPayment();
order.getState().shipOrder();

console.log('Order state: ' + (<any> order.getState()).constructor.name);
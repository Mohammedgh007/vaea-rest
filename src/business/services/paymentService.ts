const Moyasar =  require('moyasar');

/// This class handles all the related interactions with payment gateway providers
export class PaymentService {

    moyasar: any

    constructor() { //MOYASER_API_KEY
        this.moyasar = new Moyasar(process.env.MOYASER_API_KEY);
    }
    
    /**
     * This method handles verifying the payment 
     * @param payment_provider must be either MOYASER or ...
     * @param unit_id stores the booked unit id.
     */
    verifyBookingPayment = async (payment_provider: string, unit_id: string, payment_id: string): Promise<number> => {
        if (payment_provider === "MOYASAR") {
            console.log("innn")
            return await this._verifyBookingPaymentMoyaser(payment_provider, unit_id, payment_id)
        } else {
            return -1;
        }
    }


    _verifyBookingPaymentMoyaser = async (payment_provider: string, unit_id: string, payment_id: string): Promise<number> => {
        try {
            //console.log(unit_id, payment_id)
            const result = await this.moyasar.payment.fetch(payment_id)
            //console.log(result, "in payment")
            return 4000;
        } catch(e) {
            console.log("not paid")
            return 4000;
        }
        
    }

}
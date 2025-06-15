import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"
import { capturePayment } from "@/store/shop/order-slice"

const PaypalReturnPage = () => {
  const dispatch=useDispatch()
  const location=useLocation() 
  const params=new URLSearchParams(location.search)
  const paymentId=params.get('paymentId')
  const payerId=params.get('PayerID')


  useEffect(() => {
    if(paymentId && payerId){
      const orderId=JSON.parse(sessionStorage.getItem('currentOrderId'))
      dispatch(capturePayment({paymentId,payerId,orderId})).then((data)=>{
        if(data?.payload?.success){
          sessionStorage.removeItem('currentOrderId')
          window.location.href="/shop/payment-success"
        }
      })
    }
    
  }, [payerId,paymentId,dispatch])
  





  return (
    <>
    <Card>
      <CardHeader>
        <CardTitle>
          Processing Payment...Please wait!
        </CardTitle>

      </CardHeader>
      

    </Card>
    
    
    </>
  )
}

export default PaypalReturnPage

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"

const PaymentSuccess = () => {
  const navigate=useNavigate()
  return (
    <Card className="p-10">
          <CardHeader className="p-0">
            <CardTitle className="text-4xl">
              Payment is Successful...
            </CardTitle>
    
          </CardHeader>
          <Button className="mt-5" onClick={()=>navigate("/shop/account")}>View Orders</Button>
          
    
        </Card>
  )
}

export default PaymentSuccess
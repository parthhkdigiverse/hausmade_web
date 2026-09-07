import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

async def main():
    client = AsyncIOMotorClient('mongodb+srv://HK_Digiverse:HK%40Digiverse%40123@cluster0.lcbyqbq.mongodb.net/hausmade_db?retryWrites=true&w=majority&appName=Cluster0')
    db = client['hausmade_db']
    orders = await db['orders'].find(sort=[('_id', -1)]).to_list(10)
    for o in orders:
        print("ORDER_ID:", o.get('orderId'))
        print("STATUS:", o.get('status'))
        print("PAYMENT_METHOD:", o.get('paymentMethod'))
        print("PAYMENT_STATUS:", o.get('payment_status'))
        print("---")

asyncio.run(main())

module.exports={
    G_Manager:{
        Select:'select * from G_Manager',
        Add:'insert into User (Account,PassWord,Name,Sex,Phone) values (?,?,?,?,?)',
        Delete:'delete from G_Manager'
    },
    L_Manager:{
        Select:'select * from L_Manager',
        Add:'insert into User (Account,PassWord,Name,Sex,Phone) values (?,?,?,?,?)',
        Delete:'delete from L_Manager'
    },
    Waiter:{
        Select:'select * from Waiter',
        Add:'insert into User (Account,PassWord,Name,Sex,Phone) values (?,?,?,?,?)',
        Delete:'delete from Waiter'
    },
    User:{
        Select:'select * from User',
        Add:'insert into User (Account,PassWord,Name,Sex,Phone,VIP) values (?,?,?,?,?,?)',
        Delete:'delete from User',
        Update:'update user set VIP="Yes" where Account=? and PassWord=?'
    },
    Room:{
        Select:'select * from Room',
        Change:"update room set RoomCheckIn=?, RoomCheckOut=? where RoomID=?"
    },
    Order:{
        Select:'select * from `order`',
        Add:'insert into `order` (Account,RoomID,Price,CheckIn,CheckOut,Place) values (?,?,?,?,?,?)',
        Delete:"DELETE FROM `order` where Account=? and RoomID=? and CheckIn=? and CheckOut=?"
    },
    Goods:{
        Select:'select * from Goods',
        Delete:"delete from Goods where RoomID=?",
        Update:"update Goods set Water='2',ToothBrush='2',Towel='2',Shampoo='1',ShowerGel='1' where RoomID=?",
        UpdateGoods:"update Goods set Water=?,ToothBrush=?,Towel=?,Shampoo=?,ShowerGel=? where RoomID=?"
    }
}
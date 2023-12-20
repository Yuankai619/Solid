
module.exports = function (req,res,next){
    //res.send('haha')
    //res.send(req.user)
    console.log('auth check if login----------------------')
    console.log(req.session);
    if(req.session.passport){
        const token = req.session.passport.user;
        if(token._id){
            if(token.studentID){
                console.log('login sucess');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'FinishCompleteCreate' 
                }
                res.json(resp)
            }else{
                console.log('createState fail');
                const resp = {
                    loginState: 'LoginSuccess',
                    completeCreateState: 'FinishCompleteCreate' 
                }
                res.json(resp)
            }
        }else{
            console.log('login fail');
            const resp = {
                loginState: 'LoginFailed',
                completeCreateState: 'UnFinishCompleteCreate' 
            }
            res.json(resp)
        }
    }else{
        console.log('login fail');
        const resp = {
            loginState: 'LoginFailed',
            completeCreateState: 'UnFinishCompleteCreate' 
        }
        res.json(resp)
    }
}

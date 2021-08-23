const express= require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User= require('../models/user');
const Postmodel= require('../models/post');
const requireLogin= require('../middleware/requireLogin');


router.get('/user/:id',(req,res)=>{
    User.findOne({_id:req.params.id})
    .select("-password")
    .then(user=>{
        Postmodel.find({postedBy:req.params.id})
        .populate("postedBy","_id name", User)
        .exec((err,posts)=>{
            if(err)
            {return res.status(422).json({error:err})}
            res.json({user,posts})

        })
    })
    .catch(err=>{
        return(res.status(422).json({error:"User not found"}))
    })
})

router.put('/follow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followId}
        },{
            new:true
        }).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    )  
})

router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.unfollowId}
        },{
            new:true
        }).select("-password").then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    }
    )  
})

router.put('/favourite',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $push:{savedpost:req.body.postId}
    },{
        new:true
    }
    ) .exec((err,result)=>{
        if(err)
            {return res.status(422).json({error:err})}
            res.json(result)
    })
})



router.delete('/removefavourite',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $pull:{savedpost:req.body.postId}
    },{
        new:true
    }
    )  .exec((err,result)=>{
        if(err)
            {return res.status(422).json({error:err})}
            res.json(result)
    })
})

router.put('/updateprofile',requireLogin,(req,res)=>{

    User.findOne({_id:req.user._id})
    .exec((err,result)=>{
        if(err){res.status(422).json({error:err})}
        else res.json(result)
    })
})

router.put('/saveeditedprofilepicture',requireLogin,(req,res)=>{

         User.findByIdAndUpdate(req.user._id,{
            $set:{profilephoto:req.body.profilephoto}
         },{
            new:true
         } )
         .exec((err,result)=>{
            if(err){res.status(422).json({error:err})}
            else res.json(result)
        })
        


})

router.put('/saveeditedprofile',requireLogin,(req,res)=>{

    User.findByIdAndUpdate(req.user._id,{
       $set:{name:req.body.name,description:req.body.description}
    },{
       new:true
    } )
    .exec((err,result)=>{
       if(err){res.status(422).json({error:err})}
       else res.json(result)
   })
   


})

router.get('/mysavedposts/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
     .populate("savedpost","title body photo", Postmodel)
    .then(user=>{
        res.json(user)
    })
    .catch(err=>{
       return res.status(422).json({error:err})
    })
    
})


module.exports=router
import React,{useEffect,useContext, useState} from 'react';

import Heart from '../../assets/Heart';
import './Post.css';
import { FirebaseContext } from '../../store/Context';
import { PostContext } from '../../store/postContext';
import {useHistory} from 'react-router-dom'
function Posts() {

  const {firebase}=useContext(FirebaseContext)
  const [products,setProducts]=useState([])
  const {setPostDetails}=useContext(PostContext)
  const history = useHistory()
  useEffect(()=>{
    firebase.firestore().collection('products').get().then((snapshot)=>{
      const allpost=snapshot.docs.map((product)=>{
        //here we taking datas only which we need (docs =[])  
        return{
          ...product.data(),
          id:product.id
        }
      })
      setProducts(allpost)
    })
  },[setPostDetails])

  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map(product=>{

            
            return <div
            className="card"
            onClick={()=>{
              setPostDetails(product)
              // {console.log(product,'ooooooooooooooo');}
              history.push('/view')
            }}
            >
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.url} alt="" />
            </div>
            <div className="content">
              <p className="rate">₹{product.price}</p>
              <span className="kilometer">{product.category} </span>
              <p className="name">{product.name} </p>
            </div>
            <div className="date">
              <span>{product.createdAt} </span>
            </div>
            </div>

          })

           
          }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src="../../../Images/R15V3.jpg" alt="" />
            </div>
            <div className="content">
              <p className="rate">₹; 250000</p>
              <span className="kilometer">Two Wheeler</span>
              <p className="name"> YAMAHA R15V3</p>
            </div>
            <div className="date">
              <span>10/5/2021</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;

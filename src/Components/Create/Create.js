import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, FormControl, FormLabel } from 'react-bootstrap';

import { FirebaseContext, AuthContext } from '../../store/Context';

const Create = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null); // Initialize image as null

  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const date = new Date();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!name || !category || !price || !image) {
      alert('Please fill in all fields and select an image.');
      return;
    }

    const imageRef = firebase.storage().ref(`/image/${image.name}`);
    
    // Upload the image to Firebase Storage
    imageRef.put(image).then(() => {
      imageRef.getDownloadURL().then((url) => {
        console.log(url);
        // Add the product details to Firestore
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId: user.uid,
          createdAt: date.toDateString(),
        })
        .then(() => {
          history.push('/');
        })
        .catch((error) => {
          console.error('Error adding product to Firestore:', error);
        });
      });
    });
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv" style={{ width: '380px' }}>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3" htmlFor="fname">
            <FormLabel>Name</FormLabel>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="fname"
              name="Name"
              placeholder="Enter Product name"
            />
          </FormGroup>

          <FormGroup className="mb-3" htmlFor="fcategory">
            <FormLabel>Category</FormLabel>
            <FormControl
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="fcategory"
              name="category"
              placeholder="Enter Product category"
            />
          </FormGroup>

          <FormGroup className="mb-3" htmlFor="fprice">
            <FormLabel>Price</FormLabel>
            <FormControl
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              id="fprice"
              name="price"
              placeholder="Enter Product price"
            />
          </FormGroup>

          <br />
          <img alt="image" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''} />
          <br />
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
          />
          <br />
          <button className="uploadBtn button" type="submit">Upload and Submit</button>
        </Form>
      </div>
    </Fragment>
  );
};

export default Create;

async function getPosts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        console.log("GET:", data);
    } catch (error) {
        console.error("GET error:", error);
    }
}



const newProduct = { "id": "7", "name": "Headsets", "price": 60 };

async function createPost() {
  if (!validateProduct(newProduct)) {
    console.error("Can't create a invalid product");
    return;

  }

  try {
    const response = await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProduct)
    });

    const data = await response.json();
    console.log("POST:", data);
  } catch (error) {
    console.error("Error creating the product:", error);
  }
}



const updateProduct =  { "id": "4", "name": "Bicicleta", "price": 210 };

async function updatePost() {
    if (!validateProduct(updateProduct)) {
        console.error("Can't update an invalid product");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/products/${updateProduct.id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            }, 
            body: JSON.stringify(updateProduct)
            }
        );
    } catch(error) {
        console.error("Error updating product", error);
    }
}



async function deleteProduct(id) {
    try {
        const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "DELETE",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! STATUS: ${response.status}`);
        }
        console.log("Product disposed correctly");

    } catch(error) {
        console.error("Error deleting prodcuct", error);
    }   
}


function validateProduct(product) {
    if (!product.name || typeof product.price !== "number" || product.price <= 0) {
        console.error("Invalid product data.");
        return false;
    }
    return true;
}


async function main() {
  await getPosts();
  await createPost();
  await updatePost();
  await deleteProduct(2);
  await getPosts();
}

main();
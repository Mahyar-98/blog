import { useState } from "react";

const CommentForm = ({ postTitle, commentId = "" }) => {
  const [errors, setErrors] = useState({});
  const [commentFormData, setCommentFormData] = useState({
    name: "",
    email: "",
    website: "",
    body: "",
  });

  // Change the commentFormData as the user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Validate the commentFormData
  const validateComment = () => {
    let isValid = true;
    const errors = {};

    if (!commentFormData.name.trim()) {
      errors.name = "Your name is required";
      isValid = false;
    }

    if (!commentFormData.email.trim()) {
      errors.email = "Your email address is required";
      isValid = false;
    } else if (
      !commentFormData.email
        .trim()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      errors.email = "Email address is invalid";
      isValid = false;
    }

    if (
      commentFormData.website.trim() &&
      !sanitizeUrl(commentFormData.website)
    ) {
      errors.website = "Website URL is invalid";
      isValid = false;
    }

    if (!commentFormData.body.trim()) {
      errors.body = "Comment cannot be empty";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Attach HTTPS protocol to the URL if not provided
  const sanitizeUrl = (inputUrl) => {
    // Check if the URL contains a protocol
    if (inputUrl.trim().match(/^(ftp|http|https):\/\/.*/)) {
      // URL already includes a protocol
      return inputUrl.trim();
    } else if (inputUrl.trim().match(/^\w+\.\w+/)) {
      // Assume HTTPS protocol if no protocol is provided
      return "https://" + inputUrl.trim();
    } else {
      // Invalid URL format or not provided
      return undefined;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateComment()) {
      const sanitizedFormData = { ...commentFormData };
      sanitizedFormData.website = sanitizeUrl(commentFormData.website);
      fetch(
        "http://localhost:3000/posts/" + postTitle + "/comments/" + commentId,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sanitizedFormData),
        },
      )
        .then((res) => {
          if (res.ok) {
            // Reload the same page
            window.location.reload();
          } else {
            console.error("Error: ", res.status);
          }
        })
        .catch((err) => console.error("Error: ", err));
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">Name *</label>
      <input
        type="text"
        name="name"
        id="name"
        value={commentFormData.name}
        onChange={handleInputChange}
      />
      {errors.name && <span className="error">{errors.name}</span>}
      <label htmlFor="email">Email *</label>
      <input
        type="email"
        name="email"
        id="email"
        value={commentFormData.email}
        onChange={handleInputChange}
      />
      {errors.email && <span className="error">{errors.email}</span>}
      <label htmlFor="website">Website </label>
      <input
        type="text"
        name="website"
        id="website"
        value={commentFormData.website}
        onChange={handleInputChange}
      />
      {errors.website && <span className="error">{errors.website}</span>}
      <label htmlFor="body">Comment: </label>
      <textarea
        name="body"
        id="body"
        cols="30"
        rows="10"
        value={commentFormData.body}
        onChange={handleInputChange}
      ></textarea>
      {errors.body && <span className="error">{errors.body}</span>}
      <button>Post</button>
    </form>
  );
};

export default CommentForm;

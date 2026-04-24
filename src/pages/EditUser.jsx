import { useState, useEffect } from "react";
import "./editUser.css";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../slices/userSlice";

function UserEdit() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userData = user?.data;
  const userDataNew = userData?.loggedInUser;
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    profession: "",
    address: "",
    phone: "",
    website: "",
    github: "",
    twitter: "",
    instagram: "",
    facebook: "",
  });

  // ✅ populate form when userData arrives in redux
  useEffect(() => {
    if (!userData) return;

    setFormData({
      fullName: userData.fullName || userDataNew?.fullName,
      username: userData.username || userDataNew?.username,
      profession: userData.profession || userDataNew?.profession,
      address: userData.address || userDataNew?.address,
      phone: userData.phone || userDataNew?.phone,
      website:
        userData.socialLinks?.website || userDataNew?.socialLinks?.website,
      github: userData.socialLinks?.github || userDataNew?.socialLinks?.github,
      twitter:
        userData.socialLinks?.twitter || userDataNew?.socialLinks?.twitter,
      instagram:
        userData.socialLinks?.instagram || userDataNew?.socialLinks?.instagram,
      facebook:
        userData.socialLinks?.facebook || userDataNew?.socialLinks?.facebook,
    });
  }, [userData, userDataNew]);

  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.put("/update", {
        fullName: formData.fullName,
        username: formData.username,
        profession: formData.profession,
        address: formData.address,
        phone: formData.phone,
        socialLinks: {
          website: formData.website,
          github: formData.github,
          twitter: formData.twitter,
          instagram: formData.instagram,
          facebook: formData.facebook,
        },
      });

      dispatch(addUser(response.data));
      navigate("/user");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="container py-5" style={{ maxWidth: "850px" }}>
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <h2 className="fw-bold mb-1">Edit Profile</h2>
          <p className="text-muted mb-4">Update your personal information</p>

          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Profession</label>
                <input
                  type="text"
                  name="profession"
                  className="form-control"
                  value={formData.profession}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Phone</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <hr className="my-4" />
            <h5 className="fw-bold mb-3">Social Links</h5>

            <div className="row g-3">
              {["website", "github", "twitter", "instagram", "facebook"].map(
                (item, index) => (
                  <div className="col-md-6" key={index}>
                    <label className="form-label text-capitalize fw-semibold">
                      {item}
                    </label>
                    <input
                      type="text"
                      name={item}
                      className="form-control"
                      value={formData[item]}
                      onChange={handleChange}
                    />
                  </div>
                ),
              )}
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-dark w-100 py-2"
                disabled={loading}
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;

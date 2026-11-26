import { useState, useEffect } from "react";

function OpportunityForm({
  onAddOpportunity,
  providerId,
  editingOpportunity,
  onUpdateOpportunity,
  onCancelEdit,
}) {
const emptyForm = {
    title: "",
    organization: "",
    salary: "",
    jobType: "",
    category: "",
    location: "",
    descriptionExcerpt: "",
    closingDate: "",
    url: "#",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Fill the form when an opportunity is selected for editing
  useEffect(() => {
 if (editingOpportunity) {
 setFormData({
  title: editingOpportunity.title,
  organization: editingOpportunity.organization,
  salary: editingOpportunity.salary || "",
  jobType: editingOpportunity.jobType,
  category: editingOpportunity.category,
  location: editingOpportunity.location,
  descriptionExcerpt: editingOpportunity.descriptionExcerpt,
  closingDate: editingOpportunity.closingDate,
  url: editingOpportunity.url || "#",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [editingOpportunity]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

function handleSubmit(e) { e.preventDefault();

if (editingOpportunity) {
 onUpdateOpportunity({ ...editingOpportunity, ...formData,});
 } else {
    const newOpportunity = {id: Date.now(), ...formData, providerId,};

onAddOpportunity(newOpportunity);
}

setFormData(emptyForm);
  }

return (
    <form
      className="space-y-4 rounded-xl bg-white p-6 shadow-sm"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-bold text-[#042F2E]">
        {editingOpportunity ? "Edit Opportunity" : "Create a New Opportunity"}
      </h2>

      <div>
        <label className="mb-1 block font-medium">Opportunity Title</label>
        <input className="w-full rounded-lg border p-3" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Frontend Developer Intern" required />
      </div>

      <div>
        <label className="mb-1 block font-medium">Organization</label>
        <input className="w-full rounded-lg border p-3" name="organization" value={formData.organization} onChange={handleChange} placeholder="Organization name" required />
      </div>

      <div>
        <label className="mb-1 block font-medium">Salary or Stipend</label>
        <input className="w-full rounded-lg border p-3" name="salary" value={formData.salary} onChange={handleChange} placeholder="e.g. KSh 15,000 per month" />
      </div>

      <div>
        <label className="mb-1 block font-medium">Job Type</label>
        <select className="w-full rounded-lg border p-3" name="jobType" value={formData.jobType} onChange={handleChange} required>
          <option value="">Select job type</option>
          <option value="Internship">Internship</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Volunteer">Volunteer</option>
          <option value="Training">Training</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block font-medium">Category</label>
        <input className="w-full rounded-lg border p-3" name="category" value={formData.category} onChange={handleChange} placeholder="e.g. Technology" required />
      </div>

      <div>
        <label className="mb-1 block font-medium">Location</label>
        <input className="w-full rounded-lg border p-3" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Nairobi or Remote" required />
      </div>

      <div>
        <label className="mb-1 block font-medium">Description</label>
        <textarea className="w-full rounded-lg border p-3" name="descriptionExcerpt" value={formData.descriptionExcerpt} onChange={handleChange} placeholder="Describe the opportunity..." rows="4" required />
      </div>

      <div>
        <label className="mb-1 block font-medium">Application Deadline</label>
        <input className="w-full rounded-lg border p-3" type="date" name="closingDate" value={formData.closingDate} onChange={handleChange} required />
      </div>

      <button  className="w-full rounded-lg bg-[#0F766E] p-3 font-semibold text-white hover:bg-[#134E4A]" type="submit">
        {editingOpportunity ? "Save Changes" : "Create Opportunity"}
      </button>

      {editingOpportunity && (
        <button className="w-full rounded-lg border border-gray-300 p-3 font-semibold text-gray-700 hover:bg-gray-100" type="button" onClick={onCancelEdit}
    >Cancel Editing</button>
      )}
    </form>
  );
}

export default OpportunityForm;

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

function AddUserDialog({ open, onOpenChange, onCreateUser }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    company: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await onCreateUser(formData);
    if (!result.ok) return;

    setFormData({ name: "", email: "", role: "", department: "", company: "", phone: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Create a new user account for the placement system</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                  <SelectItem value="placement-officer">Placement Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formData.role === "student" && (
              <div>
                <Label htmlFor="department">Department *</Label>
                <Input
                  id="department"
                  placeholder="e.g., Computer Science"
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
            )}
            {formData.role === "employer" && (
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  placeholder="Enter company name"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>
            )}
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Create User</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { AddUserDialog };

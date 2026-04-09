import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Mail, GraduationCap, Award, Calendar, Edit } from "lucide-react";
import { EditProfileDialog } from "./EditProfileDialog";
import { UpdateResumeDialog } from "./UpdateResumeDialog";
import { usePlacementData } from "../../context/PlacementDataContext";

function StudentProfile({ student }) {
  const { updateStudentProfile } = usePlacementData();
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [updateResumeOpen, setUpdateResumeOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">My Profile</h2>
          <p className="text-gray-600">Manage your profile information</p>
        </div>
        <Button onClick={() => setEditProfileOpen(true)}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <EditProfileDialog
        open={editProfileOpen}
        onOpenChange={setEditProfileOpen}
        student={student}
        onSave={(updates) => updateStudentProfile(student.id, updates)}
      />

      <UpdateResumeDialog
        open={updateResumeOpen}
        onOpenChange={setUpdateResumeOpen}
        onUpload={(resumeFileName) => updateStudentProfile(student.id, { resume: resumeFileName })}
      />

      <Card>
        <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">Full Name</p>
              <p className="text-gray-900">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{student.email}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Department</p>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{student.department}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Graduation Year</p>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{student.graduationYear}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">CGPA</p>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gray-400" />
                <p className="text-gray-900">{student.cgpa?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(student.skills || []).map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1">{skill}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Resume</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm">{student.resume || "resume.pdf"}</p>
                <p className="text-xs text-gray-500">Last updated: Feb 20, 2026</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setUpdateResumeOpen(true)}>
              Update Resume
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { StudentProfile };

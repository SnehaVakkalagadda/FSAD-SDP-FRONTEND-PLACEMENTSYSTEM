import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { toast } from "sonner";
function UpdateResumeDialog({ open, onOpenChange, onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    setUploading(true);
    setTimeout(() => {
      onUpload(selectedFile.name);
      setUploading(false);
      toast.success("Resume uploaded successfully!");
      setSelectedFile(null);
      onOpenChange(false);
    }, 1500);
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsx(DialogTitle, { children: "Update Resume" }),
      /* @__PURE__ */ jsx(DialogDescription, { children: "Upload your latest resume in PDF format" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { htmlFor: "resume", children: "Resume File *" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2", children: /* @__PURE__ */ jsxs(
            "label",
            {
              htmlFor: "resume",
              className: "flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors",
              children: [
                selectedFile ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsx(CheckCircle, { className: "w-8 h-8 text-green-600" }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                    /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { className: "font-medium", children: selectedFile.name })
                  ] }),
                  /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                    (selectedFile.size / 1024).toFixed(2),
                    " KB"
                  ] })
                ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Upload, { className: "w-8 h-8 text-gray-400" }),
                  /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600", children: "Click to upload or drag and drop" }),
                  /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-500", children: "PDF files only (max 5MB)" })
                ] }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "resume",
                    type: "file",
                    accept: ".pdf",
                    onChange: handleFileChange,
                    className: "hidden",
                    required: true
                  }
                )
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-blue-50 border border-blue-200 rounded-lg p-3", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-blue-900", children: /* @__PURE__ */ jsx("strong", { children: "Guidelines:" }) }),
          /* @__PURE__ */ jsxs("ul", { className: "text-xs text-blue-800 mt-2 space-y-1 list-disc list-inside", children: [
            /* @__PURE__ */ jsx("li", { children: "File must be in PDF format" }),
            /* @__PURE__ */ jsx("li", { children: "Maximum file size: 5MB" }),
            /* @__PURE__ */ jsx("li", { children: "Include your contact information" }),
            /* @__PURE__ */ jsx("li", { children: "Keep it to 1-2 pages" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", disabled: uploading, children: uploading ? "Uploading..." : "Upload Resume" })
      ] })
    ] })
  ] }) });
}
export {
  UpdateResumeDialog
};

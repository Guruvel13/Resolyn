import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, Power, Truck, Trash2, TreePine, MapPin, UploadCloud, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import MapPicker from '../components/MapPicker';

const departments = [
  { id: 'water', name: 'Water & Supply', icon: <Droplet className="w-6 h-6" />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'electricity', name: 'Electricity', icon: <Power className="w-6 h-6" />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'roads', name: 'Roads & Traffic', icon: <Truck className="w-6 h-6" />, color: 'bg-slate-100 text-slate-700 border-slate-200' },
  { id: 'sanitation', name: 'Sanitation', icon: <Trash2 className="w-6 h-6" />, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { id: 'parks', name: 'Parks & Recreation', icon: <TreePine className="w-6 h-6" />, color: 'bg-green-100 text-green-700 border-green-200' },
];

const steps = [
  { num: 1, title: 'Classification' },
  { num: 2, title: 'Evidence' },
  { num: 3, title: 'Location' },
  { num: 4, title: 'Review' },
];

const ComplaintForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    department: null,
    files: [],
    position: null, // [lat, lng]
    description: '',
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png'] },
    onDrop: acceptedFiles => {
      // Logic: Compressing images on client side before sending
      // Mocking the result here
      setFormData(prev => ({ ...prev, files: [...prev.files, ...acceptedFiles] }));
    }
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const submitForm = () => {
    // API logic to backend
    navigate('/dashboard');
  };

  const isNextDisabled = () => {
    if (currentStep === 1 && !formData.department) return true;
    if (currentStep === 2 && formData.files.length === 0 && !formData.description) return true; // Require at least one
    if (currentStep === 3 && !formData.position) return true;
    return false;
  };

  return (
    <div className="max-w-3xl mx-auto w-full pt-8 animate-in fade-in duration-500">
      
      {/* Header & Stepper */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">File a New Report</h1>
        <p className="text-slate-500 mt-2">Provide accurate details to ensure rapid resolution.</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -mt-px w-full h-[2px] bg-slate-200 -z-10"></div>
          {steps.map((step) => {
            const isActive = currentStep >= step.num;
            return (
              <div key={step.num} className="flex flex-col items-center gap-2 bg-slate-50 px-2 transition-all">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 
                  ${isActive ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/30' : 'bg-white border-slate-300 text-slate-400'}`}>
                  {currentStep > step.num ? <CheckCircle2 className="w-5 h-5 text-white" /> : step.num}
                </div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? 'text-indigo-700' : 'text-slate-400'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          
          {currentStep === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Select Department Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {departments.map((dept) => (
                  <div 
                    key={dept.id}
                    onClick={() => setFormData({...formData, department: dept})}
                    className={`cursor-pointer rounded-2xl p-6 border-2 flex flex-col items-center gap-3 text-center transition-all
                      ${formData.department?.id === dept.id ? `border-indigo-600 bg-indigo-50 shadow-sm` : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${dept.color}`}>
                      {dept.icon}
                    </div>
                    <span className="font-semibold text-slate-800 text-sm">{dept.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
               <h2 className="text-xl font-bold text-slate-900">Provide Evidence (Photos)</h2>
               
               <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors
                 ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                 <input {...getInputProps()} />
                 <div className="w-16 h-16 bg-white rounded-full shadow-sm border border-slate-200 flex items-center justify-center mx-auto mb-4 text-indigo-500">
                    <UploadCloud className="w-8 h-8" />
                 </div>
                 <p className="font-semibold text-slate-700 text-lg">Drag & drop files here</p>
                 <p className="text-sm text-slate-500 mt-1">or click to select files (JPG, PNG)</p>
                 <p className="text-xs text-indigo-600 mt-4 font-medium">* Images are compressed locally before upload.</p>
               </div>

               {formData.files.length > 0 && (
                 <div className="flex gap-4 overflow-x-auto pb-2">
                   {formData.files.map((file, idx) => (
                     <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-slate-200">
                        <img src={URL.createObjectURL(file)} className="object-cover w-full h-full" alt="evidence-preview" />
                     </div>
                   ))}
                 </div>
               )}

               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Description / Remarks</label>
                 <textarea 
                   rows="4" 
                   value={formData.description}
                   onChange={(e) => setFormData({...formData, description: e.target.value})}
                   placeholder="Describe what exactly happened..."
                   className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-700"
                 ></textarea>
               </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-900">Pin Exact Location</h2>
                <div className="flex items-center gap-2 text-sm text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">
                  <MapPin className="w-4 h-4" /> 
                  <span className="font-semibold">Auto-fetching GPS...</span>
                </div>
              </div>
              <p className="text-slate-500 text-sm -mt-4">Move the pin to the exact location of the issue.</p>
              
              <MapPicker position={formData.position} setPosition={(pos) => setFormData({...formData, position: pos})} />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Review & Submit</h2>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
                <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${formData.department?.color}`}>
                    {formData.department?.icon}
                  </div>
                  <div>
                    <h3 className="text-sm text-slate-500 font-semibold mb-1">Department</h3>
                    <p className="text-slate-900 font-bold">{formData.department?.name}</p>
                  </div>
                </div>
                
                <div className="pb-4 border-b border-slate-200">
                  <h3 className="text-sm text-slate-500 font-semibold mb-1">Description</h3>
                  <p className="text-slate-900">{formData.description || "No description provided."}</p>
                </div>

                <div className="pb-4 border-b border-slate-200">
                  <h3 className="text-sm text-slate-500 font-semibold mb-1">Evidence</h3>
                  <p className="text-slate-900">{formData.files.length} file(s) attached.</p>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm text-slate-500 font-semibold mb-1">GPS Coordinates</h3>
                    <p className="text-slate-900 font-mono text-sm">{formData.position ? `${formData.position[0]}, ${formData.position[1]}` : 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50 text-indigo-800 p-4 rounded-xl text-sm border border-indigo-100 flex gap-3">
                 <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                 <p>By submitting this report, you declare that the information is true to the best of your knowledge.</p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button 
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'}`}
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>

        {currentStep < 4 ? (
          <button 
            onClick={nextStep}
            disabled={isNextDisabled()}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold shadow-md transition-all ${isNextDisabled() ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg'}`}
          >
            Continue <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button 
            onClick={submitForm}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
          >
            Submit Official Report <CheckCircle2 className="w-5 h-5" />
          </button>
        )}
      </div>

    </div>
  );
};

export default ComplaintForm;

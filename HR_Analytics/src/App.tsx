import { useState, useCallback } from "react";
import {
  Brain,
  Users,
  Target,
  TrendingUp,
  Upload,
  Scan,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Briefcase,
  DollarSign,
  Heart,
  Clock,
  Building2,
  GitBranch,
  Linkedin,
  ChevronDown,
  Zap,
  Shield,
  Sparkles,
  FileText,
  Download,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Legend,
} from "recharts";

// Types
interface PredictionResult {
  probability: number;
  riskLevel: "Low" | "Medium" | "High";
  reasons: string[];
}

interface EmployeeData {
  age: number;
  department: string;
  monthlyIncome: number;
  jobRole: string;
  jobSatisfaction: number;
  workLifeBalance: number;
  overTime: boolean;
  yearsAtCompany: number;
}

interface BulkResult {
  total: number;
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  employees: Array<EmployeeData & { risk: string; probability: number }>;
}

// Mock prediction function
const mockPredict = (data: EmployeeData): PredictionResult => {
  let score = 0;

  // Age factor (younger employees more likely to leave)
  if (data.age < 30) score += 20;
  else if (data.age < 40) score += 10;

  // Income factor
  if (data.monthlyIncome < 3000) score += 25;
  else if (data.monthlyIncome < 5000) score += 15;

  // Job satisfaction
  score += (4 - data.jobSatisfaction) * 12;

  // Work life balance
  score += (4 - data.workLifeBalance) * 10;

  // Overtime
  if (data.overTime) score += 20;

  // Years at company
  if (data.yearsAtCompany < 2) score += 15;
  else if (data.yearsAtCompany < 5) score += 8;

  const probability = Math.min(Math.max(score + Math.random() * 10, 5), 95);

  const riskLevel =
    probability > 60 ? "High" : probability > 35 ? "Medium" : "Low";

  const reasons = [];
  if (data.overTime) reasons.push("Works overtime frequently");
  if (data.jobSatisfaction <= 2) reasons.push("Low job satisfaction score");
  if (data.monthlyIncome < 4000) reasons.push("Lower salary compared to peers");
  if (data.age < 30) reasons.push("Early career employee");
  if (data.workLifeBalance <= 2) reasons.push("Poor work-life balance");
  if (data.yearsAtCompany < 2) reasons.push("New to the organization");
  if (data.yearsAtCompany >= 10)
    reasons.push("Long tenure may indicate burnout risk");
  if (reasons.length === 0)
    reasons.push("Multiple factors contribute to risk score");

  return {
    probability: Math.round(probability),
    riskLevel,
    reasons: reasons.slice(0, 4),
  };
};

// Components
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">
              HR Attrition Intelligence
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#demo"
              className="text-gray-300 hover:text-white transition-colors">
              Demo
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white transition-colors">
              About AI
            </a>
            <a
              href="#bulk"
              className="text-gray-300 hover:text-white transition-colors">
              Bulk Analysis
            </a>
            <a
              href="#recommendations"
              className="text-gray-300 hover:text-white transition-colors">
              Recommendations
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

function HeroSection() {
  const stats = [
    { label: "Employees Analyzed", value: "1480+", icon: Users },
    { label: "Model Accuracy", value: "85%+", icon: Target },
    { label: "Departments Covered", value: "3", icon: Building2 },
    { label: "Attrition Cases", value: "238+", icon: TrendingUp },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-sm text-gray-300">
            AI-Powered Employee Retention Platform
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
          <span className="text-white">Predict Employee Turnover</span>
          <br />
          <span className="gradient-text">Before It Happens</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Leverage machine learning to identify at-risk employees and take
          proactive measures to improve retention. Reduce hiring costs and
          maintain team stability.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#demo"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all">
            Try Demo
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#bulk"
            className="px-8 py-4 rounded-xl glass text-white font-semibold flex items-center gap-2 hover:bg-white/10 transition-all">
            <Upload className="w-5 h-5" />
            Upload Employee Data
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all">
              <stat.icon className="w-8 h-8 text-teal-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <ChevronDown className="w-8 h-8 text-gray-500 mx-auto animate-bounce" />
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const features = [
    { label: "Age", icon: Users },
    { label: "Department", icon: Building2 },
    { label: "Monthly Income", icon: DollarSign },
    { label: "Job Satisfaction", icon: Heart },
    { label: "Work Life Balance", icon: Activity },
    { label: "OverTime", icon: Clock },
    { label: "Years At Company", icon: Briefcase },
  ];

  const workflow = [
    { step: "Employee Data", icon: FileText },
    { step: "Feature Processing", icon: Activity },
    { step: "ML Model", icon: Brain },
    { step: "Risk Prediction", icon: Target },
    { step: "Recommendations", icon: Lightbulb },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">About the AI Model</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our system uses advanced Logistic Regression trained on real HR data
            to predict employee attrition with high accuracy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Features */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              Features Analyzed
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5">
                  <feature.icon className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-300">{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Model Info */}
          <div className="glass rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-teal-400" />
              Model Performance
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-teal-400 font-semibold">85%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                    style={{ width: "85%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Precision</span>
                  <span className="text-teal-400 font-semibold">82%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                    style={{ width: "82%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Recall</span>
                  <span className="text-teal-400 font-semibold">78%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-500"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Workflow */}
        <div className="glass rounded-2xl p-8">
          <h3 className="text-xl font-semibold mb-8 text-center">
            Prediction Workflow
          </h3>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {workflow.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full glass-light flex items-center justify-center mb-3">
                    <item.icon className="w-8 h-8 text-teal-400" />
                  </div>
                  <span className="text-sm text-gray-400">{item.step}</span>
                </div>
                {index < workflow.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-600 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PredictionForm({
  onSubmit,
}: {
  onSubmit: (data: EmployeeData) => void;
}) {
  const [formData, setFormData] = useState<EmployeeData>({
    age: 35,
    department: "Research & Development",
    monthlyIncome: 5000,
    jobRole: "Research Scientist",
    jobSatisfaction: 3,
    workLifeBalance: 3,
    overTime: false,
    yearsAtCompany: 5,
  });

  const handleChange = (
    field: keyof EmployeeData,
    value: string | number | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const departments = ["Research & Development", "Sales", "Human Resources"];

  const jobRoles = [
    "Research Scientist",
    "Sales Executive",
    "Manager",
    "Laboratory Technician",
    "Manufacturing Director",
    "Healthcare Representative",
    "Human Resources",
  ];

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Scan className="w-6 h-6 text-teal-400" />
        Employee Information
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Age: {formData.age}
          </label>
          <input
            type="range"
            min="18"
            max="65"
            value={formData.age}
            onChange={(e) => handleChange("age", parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-teal-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>18</span>
            <span>65</span>
          </div>
        </div>

        {/* Monthly Income */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Monthly Income
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) =>
                handleChange("monthlyIncome", parseInt(e.target.value))
              }
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500"
              placeholder="Enter monthly income"
            />
          </div>
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Department
          </label>
          <select
            value={formData.department}
            onChange={(e) => handleChange("department", e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500">
            {departments.map((dept) => (
              <option key={dept} value={dept} className="bg-slate-800">
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Job Role */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Role
          </label>
          <select
            value={formData.jobRole}
            onChange={(e) => handleChange("jobRole", e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500">
            {jobRoles.map((role) => (
              <option key={role} value={role} className="bg-slate-800">
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Job Satisfaction */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Job Satisfaction: {formData.jobSatisfaction}/4
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleChange("jobSatisfaction", level)}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  formData.jobSatisfaction === level
                    ? "bg-teal-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}>
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Work Life Balance */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Work Life Balance: {formData.workLifeBalance}/4
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => handleChange("workLifeBalance", level)}
                className={`flex-1 py-3 rounded-lg transition-all ${
                  formData.workLifeBalance === level
                    ? "bg-blue-500 text-white"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}>
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Years at Company */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Years At Company: {formData.yearsAtCompany}
          </label>
          <input
            type="range"
            min="0"
            max="40"
            value={formData.yearsAtCompany}
            onChange={(e) =>
              handleChange("yearsAtCompany", parseInt(e.target.value))
            }
            className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-slate-700 accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>40</span>
          </div>
        </div>

        {/* Overtime */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            OverTime
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => handleChange("overTime", true)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                formData.overTime
                  ? "bg-red-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}>
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleChange("overTime", false)}
              className={`flex-1 py-3 rounded-lg transition-all ${
                !formData.overTime
                  ? "bg-green-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}>
              No
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="w-full mt-6 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
        <Brain className="w-5 h-5" />
        Analyze Employee
      </button>
    </form>
  );
}

function PredictionResult({ result }: { result: PredictionResult }) {
  const riskColors = {
    Low: {
      bg: "bg-green-500/20",
      border: "border-green-500",
      text: "text-green-400",
      icon: CheckCircle2,
    },
    Medium: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500",
      text: "text-yellow-400",
      icon: AlertTriangle,
    },
    High: {
      bg: "bg-red-500/20",
      border: "border-red-500",
      text: "text-red-400",
      icon: AlertCircle,
    },
  };

  const riskStyle = riskColors[result.riskLevel];
  const IconComponent = riskStyle.icon;

  const gaugeData = [
    {
      name: "risk",
      value: result.probability,
      fill:
        result.probability > 60
          ? "#ef4444"
          : result.probability > 35
            ? "#eab308"
            : "#22c55e",
    },
  ];

  return (
    <div
      className={`glass rounded-2xl p-8 ${riskStyle.border} border-2 animate-fadeIn`}>
      <div className="flex items-center gap-3 mb-6">
        <IconComponent className={`w-8 h-8 ${riskStyle.text}`} />
        <h3 className="text-xl font-semibold">Prediction Result</h3>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Gauge Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={gaugeData}
              startAngle={180}
              endAngle={0}>
              <RadialBar
                background={{ fill: "#1e293b" }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">
              {result.probability}%
            </span>
            <span className="text-sm text-gray-400">Attrition Risk</span>
          </div>
        </div>

        {/* Risk Badge */}
        <div className="flex-1">
          <div className={`${riskStyle.bg} rounded-xl p-6 mb-6`}>
            <div className="flex items-center gap-3 mb-2">
              <IconComponent className={`w-6 h-6 ${riskStyle.text}`} />
              <span className={`text-2xl font-bold ${riskStyle.text}`}>
                {result.riskLevel} Risk
              </span>
            </div>
            <p className="text-gray-400">
              {result.riskLevel === "High"
                ? "This employee has a significant likelihood of leaving the company."
                : result.riskLevel === "Medium"
                  ? "This employee shows some indicators of potential attrition."
                  : "This employee appears stable with low attrition indicators."}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-green-400">
                {result.probability <= 35
                  ? "100%"
                  : result.probability <= 60
                    ? "70%"
                    : "30%"}
              </div>
              <div className="text-xs text-gray-400">Retention Likelihood</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-blue-400">24h</div>
              <div className="text-xs text-gray-400">Analysis Time</div>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <div className="text-2xl font-bold text-teal-400">92%</div>
              <div className="text-xs text-gray-400">Confidence</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExplanationSection({ reasons }: { reasons: string[] }) {
  return (
    <div className="glass rounded-2xl p-8 mt-8">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-yellow-400" />
        Why is this employee {reasons.length > 2 ? "at risk" : "stable"}?
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-white">{index + 1}</span>
            </div>
            <p className="text-gray-300">{reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function BulkAnalysisSection() {
  const [bulkResult, setBulkResult] = useState<BulkResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processCSV = useCallback((text: string) => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

    const employees: BulkResult["employees"] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",");
      const employee: EmployeeData = {
        age: parseInt(values[headers.indexOf("age")] || "35"),
        department:
          values[headers.indexOf("department")] || "Research & Development",
        monthlyIncome: parseInt(
          values[headers.indexOf("monthlyincome")] || "5000",
        ),
        jobRole: values[headers.indexOf("jobrole")] || "Research Scientist",
        jobSatisfaction: parseInt(
          values[headers.indexOf("jobsatisfaction")] || "3",
        ),
        workLifeBalance: parseInt(
          values[headers.indexOf("worklifebalance")] || "3",
        ),
        overTime:
          (values[headers.indexOf("overtime")] || "No").toLowerCase() === "yes",
        yearsAtCompany: parseInt(
          values[headers.indexOf("yearsatcompany")] || "5",
        ),
      };

      const prediction = mockPredict(employee);
      employees.push({
        ...employee,
        risk: prediction.riskLevel,
        probability: prediction.probability,
      });
    }

    const highRisk = employees.filter((e) => e.risk === "High").length;
    const mediumRisk = employees.filter((e) => e.risk === "Medium").length;
    const lowRisk = employees.filter((e) => e.risk === "Low").length;

    setBulkResult({
      total: employees.length,
      highRisk,
      mediumRisk,
      lowRisk,
      employees,
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          processCSV(text);
        };
        reader.readAsText(file);
      }
    },
    [processCSV],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const text = event.target?.result as string;
          processCSV(text);
        };
        reader.readAsText(file);
      }
    },
    [processCSV],
  );

  const pieData = bulkResult
    ? [
        { name: "High Risk", value: bulkResult.highRisk, fill: "#ef4444" },
        { name: "Medium Risk", value: bulkResult.mediumRisk, fill: "#eab308" },
        { name: "Low Risk", value: bulkResult.lowRisk, fill: "#22c55e" },
      ]
    : [];

  return (
    <section id="bulk" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Bulk Employee Analysis</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload a CSV file to analyze multiple employees at once and get a
            comprehensive overview of attrition risks across your organization.
          </p>
        </div>

        {/* Upload Area */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`glass rounded-2xl p-12 text-center transition-all ${
            isDragging ? "border-2 border-teal-500 bg-teal-500/10" : ""
          }`}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-6">
            <Upload className="w-10 h-10 text-teal-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Drop your CSV file here
          </h3>
          <p className="text-gray-400 mb-6">or click to browse</p>
          <label className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-teal-500 text-white font-medium cursor-pointer hover:opacity-90 transition-opacity">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
            />
            Select File
          </label>
          <p className="text-sm text-gray-500 mt-4">
            Expected columns: Age, Department, MonthlyIncome, JobRole,
            JobSatisfaction, WorkLifeBalance, OverTime, YearsAtCompany
          </p>
          <button
            onClick={() => {
              const csvContent = `age,department,monthlyincome,jobrole,jobsatisfaction,worklifebalance,overtime,yearsatcompany
25,Sales,3500,Sales Executive,2,2,Yes,1
32,Research & Development,7500,Research Scientist,4,3,No,5
45,Human Resources,5200,Human Resources,3,3,No,15
28,Sales,2800,Sales Executive,2,1,Yes,2
38,Research & Development,9000,Manager,4,4,No,10
52,Human Resources,4800,Human Resources,3,2,No,20
29,Research & Development,4100,Laboratory Technician,3,2,Yes,3`;
              processCSV(csvContent);
            }}
            className="mt-4 text-sm text-teal-400 hover:text-teal-300 transition-colors">
            Load sample data for demo
          </button>
        </div>

        {/* Results */}
        {bulkResult && (
          <div className="mt-8 space-y-8">
            {/* Summary Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
              <div className="glass rounded-xl p-6 text-center">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">
                  {bulkResult.total}
                </div>
                <div className="text-sm text-gray-400">Total Employees</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-red-400">
                  {bulkResult.highRisk}
                </div>
                <div className="text-sm text-gray-400">High Risk</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-yellow-400">
                  {bulkResult.mediumRisk}
                </div>
                <div className="text-sm text-gray-400">Medium Risk</div>
              </div>
              <div className="glass rounded-xl p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-400">
                  {bulkResult.lowRisk}
                </div>
                <div className="text-sm text-gray-400">Low Risk</div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-teal-400" />
                  Risk Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-teal-400" />
                  Risk by Department
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      {
                        name: "R&D",
                        high: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Research") &&
                            e.risk === "High",
                        ).length,
                        medium: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Research") &&
                            e.risk === "Medium",
                        ).length,
                        low: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Research") &&
                            e.risk === "Low",
                        ).length,
                      },
                      {
                        name: "Sales",
                        high: bulkResult.employees.filter(
                          (e) => e.department === "Sales" && e.risk === "High",
                        ).length,
                        medium: bulkResult.employees.filter(
                          (e) =>
                            e.department === "Sales" && e.risk === "Medium",
                        ).length,
                        low: bulkResult.employees.filter(
                          (e) => e.department === "Sales" && e.risk === "Low",
                        ).length,
                      },
                      {
                        name: "HR",
                        high: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Human") && e.risk === "High",
                        ).length,
                        medium: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Human") &&
                            e.risk === "Medium",
                        ).length,
                        low: bulkResult.employees.filter(
                          (e) =>
                            e.department.includes("Human") && e.risk === "Low",
                        ).length,
                      },
                    ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="high" fill="#ef4444" name="High Risk" />
                    <Bar dataKey="medium" fill="#eab308" name="Medium Risk" />
                    <Bar dataKey="low" fill="#22c55e" name="Low Risk" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Employee Table */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  Employee Details
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Age
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Department
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Job Role
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Income
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Overtime
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Risk
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {bulkResult.employees.map((employee, index) => (
                      <tr
                        key={index}
                        className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 text-gray-300">
                          {employee.age}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {employee.jobRole}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          ${employee.monthlyIncome.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-gray-300">
                          {employee.overTime ? (
                            <span className="px-2 py-1 rounded text-xs bg-red-500/20 text-red-400">
                              Yes
                            </span>
                          ) : (
                            <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              employee.risk === "High"
                                ? "bg-red-500/20 text-red-400"
                                : employee.risk === "Medium"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-green-500/20 text-green-400"
                            }`}>
                            {employee.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-medium">
                          {employee.probability}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Export Button */}
            <div className="text-center">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg glass hover:bg-white/10 transition-all text-white font-medium">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function RecommendationsSection() {
  const recommendations = [
    {
      title: "Reduce Excessive Overtime",
      description:
        "Implement policies to limit overtime hours and distribute workload more evenly across teams.",
      icon: Clock,
      color: "text-red-400",
      bg: "bg-red-500/20",
    },
    {
      title: "Improve Employee Engagement",
      description:
        "Create opportunities for professional development, recognition programs, and team-building activities.",
      icon: Heart,
      color: "text-pink-400",
      bg: "bg-pink-500/20",
    },
    {
      title: "Review Compensation Structure",
      description:
        "Conduct market analysis to ensure competitive salaries, especially for high-risk departments.",
      icon: DollarSign,
      color: "text-green-400",
      bg: "bg-green-500/20",
    },
    {
      title: "Enhance Work-Life Balance",
      description:
        "Offer flexible working arrangements, remote work options, and generous PTO policies.",
      icon: Activity,
      color: "text-teal-400",
      bg: "bg-teal-500/20",
    },
    {
      title: "Focus on Retention Programs",
      description:
        "Develop targeted retention strategies for high-risk employees including mentorship and career paths.",
      icon: Target,
      color: "text-blue-400",
      bg: "bg-blue-500/20",
    },
  ];

  return (
    <section id="recommendations" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Business Recommendations</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Data-driven strategies to reduce employee attrition and improve
            retention rates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div
              key={index}
              className="glass rounded-2xl p-6 hover:bg-white/10 transition-all group">
              <div
                className={`w-14 h-14 rounded-xl ${rec.bg} flex items-center justify-center mb-4`}>
                <rec.icon className={`w-7 h-7 ${rec.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-teal-400 transition-colors">
                {rec.title}
              </h3>
              <p className="text-gray-400 text-sm">{rec.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4 justify-center">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">
                HR Attrition Intelligence
              </span>
            </div>
            <p className="text-gray-400 text-sm justify-center items-center flex">
              AI-powered employee retention platform helping HR teams predict
              and prevent turnover before it happens.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-gray-500 text-sm">
            HR Attrition Intelligence - Machine Learning Demo Project
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Built with React, Tailwind CSS, Flask API & Scikit-Learn
          </p>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [formData, setFormData] = useState<EmployeeData | null>(null);

  const handlePredict = (data: EmployeeData) => {
    setFormData(data);
    setPrediction(mockPredict(data));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />
      <HeroSection />
      <AboutSection />

      {/* Live Demo Section */}
      <section id="demo" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="gradient-text">Live Employee Prediction</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enter employee information to get an instant AI-powered attrition
              risk assessment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <PredictionForm onSubmit={handlePredict} />
            {prediction ? (
              <div className="space-y-6">
                <PredictionResult result={prediction} />
                <ExplanationSection reasons={prediction.reasons} />
              </div>
            ) : (
              <div className="glass rounded-2xl p-8 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-10 h-10 text-teal-400 animate-pulse" />
                  </div>
                  <p className="text-gray-400">
                    Fill out the form to see your prediction results here
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <BulkAnalysisSection />
      <RecommendationsSection />
      <Footer />
    </div>
  );
}

export default App;

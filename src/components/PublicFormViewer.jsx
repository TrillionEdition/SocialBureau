import { FormView } from "@/pages/ClientEnquiry";
import { useParams, useNavigate } from "react-router-dom";

export default function PublicFormView() {
  const { slug } = useParams();
  const navigate = useNavigate();
  return <FormView slug={slug} navigate={(r) => navigate("/" + r)} />;
}
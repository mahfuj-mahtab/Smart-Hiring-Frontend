import { getCandidateProfile } from "@/features/candidate-profile/api/profile";
import { CandidateProfileContent } from "@/features/candidate-profile/components/CandidateProfileContent";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "My Profile — Smart Hiring",
};

export default async function CandidateProfilePage() {
  const { data } = await getCandidateProfile();
  return <CandidateProfileContent profile={data} />;
}

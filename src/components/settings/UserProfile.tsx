import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Camera, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  bio: z.string().optional(),
  timezone: z.string().min(1, "Timezone is required"),
  language: z.string().min(1, "Language is required")
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function UserProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isDirty }
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      company: "SEO Agency Inc.",
      jobTitle: "Content Marketing Manager",
      bio: "Experienced content marketer focused on SEO and automation.",
      timezone: "America/New_York",
      language: "en"
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    try {
      // TODO: Implement profile update
      console.log("Updating profile:", data);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarUpload = () => {
    // TODO: Implement avatar upload
    toast({
      title: "Feature coming soon",
      description: "Avatar upload will be available in the next update."
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile Information
          </CardTitle>
          <CardDescription>
            Update your personal information and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile picture" />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAvatarUpload}
                className="gap-2"
              >
                <Camera className="h-4 w-4" />
                Change Photo
              </Button>
              <p className="text-sm text-muted-foreground mt-1">
                JPG, PNG or GIF. Max size 2MB.
              </p>
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Professional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Your company name"
                {...register("company")}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                placeholder="Your job title"
                {...register("jobTitle")}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your role..."
              rows={3}
              {...register("bio")}
            />
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone *</Label>
              <Select onValueChange={(value) => setValue("timezone", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="Europe/London">London (GMT)</SelectItem>
                  <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                  <SelectItem value="Asia/Tokyo">Tokyo (JST)</SelectItem>
                  <SelectItem value="Australia/Sydney">Sydney (AEDT)</SelectItem>
                </SelectContent>
              </Select>
              {errors.timezone && (
                <p className="text-sm text-destructive">{errors.timezone.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language *</Label>
              <Select onValueChange={(value) => setValue("language", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                  <SelectItem value="zh">Chinese</SelectItem>
                  <SelectItem value="ja">Japanese</SelectItem>
                </SelectContent>
              </Select>
              {errors.language && (
                <p className="text-sm text-destructive">{errors.language.message}</p>
              )}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button
              type="submit"
              disabled={!isDirty || isLoading}
              className="gap-2"
            >
              <Save className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
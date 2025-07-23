import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Globe } from "lucide-react";
import { Country } from "@/types";

interface LocationSelectorProps {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
}

export function LocationSelector({ value, onChange, error }: LocationSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Top 50+ countries for SEO targeting
  const countries: Country[] = [
    { code: "US", name: "United States", flag: "🇺🇸" },
    { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
    { code: "CA", name: "Canada", flag: "🇨🇦" },
    { code: "AU", name: "Australia", flag: "🇦🇺" },
    { code: "DE", name: "Germany", flag: "🇩🇪" },
    { code: "FR", name: "France", flag: "🇫🇷" },
    { code: "ES", name: "Spain", flag: "🇪🇸" },
    { code: "IT", name: "Italy", flag: "🇮🇹" },
    { code: "NL", name: "Netherlands", flag: "🇳🇱" },
    { code: "SE", name: "Sweden", flag: "🇸🇪" },
    { code: "NO", name: "Norway", flag: "🇳🇴" },
    { code: "DK", name: "Denmark", flag: "🇩🇰" },
    { code: "FI", name: "Finland", flag: "🇫🇮" },
    { code: "CH", name: "Switzerland", flag: "🇨🇭" },
    { code: "AT", name: "Austria", flag: "🇦🇹" },
    { code: "BE", name: "Belgium", flag: "🇧🇪" },
    { code: "IE", name: "Ireland", flag: "🇮🇪" },
    { code: "PT", name: "Portugal", flag: "🇵🇹" },
    { code: "PL", name: "Poland", flag: "🇵🇱" },
    { code: "CZ", name: "Czech Republic", flag: "🇨🇿" },
    { code: "HU", name: "Hungary", flag: "🇭🇺" },
    { code: "GR", name: "Greece", flag: "🇬🇷" },
    { code: "RO", name: "Romania", flag: "🇷🇴" },
    { code: "BG", name: "Bulgaria", flag: "🇧🇬" },
    { code: "HR", name: "Croatia", flag: "🇭🇷" },
    { code: "SI", name: "Slovenia", flag: "🇸🇮" },
    { code: "SK", name: "Slovakia", flag: "🇸🇰" },
    { code: "LT", name: "Lithuania", flag: "🇱🇹" },
    { code: "LV", name: "Latvia", flag: "🇱🇻" },
    { code: "EE", name: "Estonia", flag: "🇪🇪" },
    { code: "JP", name: "Japan", flag: "🇯🇵" },
    { code: "KR", name: "South Korea", flag: "🇰🇷" },
    { code: "CN", name: "China", flag: "🇨🇳" },
    { code: "HK", name: "Hong Kong", flag: "🇭🇰" },
    { code: "SG", name: "Singapore", flag: "🇸🇬" },
    { code: "MY", name: "Malaysia", flag: "🇲🇾" },
    { code: "TH", name: "Thailand", flag: "🇹🇭" },
    { code: "PH", name: "Philippines", flag: "🇵🇭" },
    { code: "ID", name: "Indonesia", flag: "🇮🇩" },
    { code: "VN", name: "Vietnam", flag: "🇻🇳" },
    { code: "IN", name: "India", flag: "🇮🇳" },
    { code: "PK", name: "Pakistan", flag: "🇵🇰" },
    { code: "BD", name: "Bangladesh", flag: "🇧🇩" },
    { code: "LK", name: "Sri Lanka", flag: "🇱🇰" },
    { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
    { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "QA", name: "Qatar", flag: "🇶🇦" },
    { code: "KW", name: "Kuwait", flag: "🇰🇼" },
    { code: "BH", name: "Bahrain", flag: "🇧🇭" },
    { code: "OM", name: "Oman", flag: "🇴🇲" },
    { code: "IL", name: "Israel", flag: "🇮🇱" },
    { code: "TR", name: "Turkey", flag: "🇹🇷" },
    { code: "EG", name: "Egypt", flag: "🇪🇬" },
    { code: "ZA", name: "South Africa", flag: "🇿🇦" },
    { code: "KE", name: "Kenya", flag: "🇰🇪" },
    { code: "NG", name: "Nigeria", flag: "🇳🇬" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "BR", name: "Brazil", flag: "🇧🇷" },
    { code: "MX", name: "Mexico", flag: "🇲🇽" },
    { code: "AR", name: "Argentina", flag: "🇦🇷" },
    { code: "CL", name: "Chile", flag: "🇨🇱" },
    { code: "CO", name: "Colombia", flag: "🇨🇴" },
    { code: "PE", name: "Peru", flag: "🇵🇪" },
    { code: "EC", name: "Ecuador", flag: "🇪🇨" },
    { code: "UY", name: "Uruguay", flag: "🇺🇾" },
    { code: "PY", name: "Paraguay", flag: "🇵🇾" },
    { code: "BO", name: "Bolivia", flag: "🇧🇴" },
    { code: "VE", name: "Venezuela", flag: "🇻🇪" },
    { code: "CR", name: "Costa Rica", flag: "🇨🇷" },
    { code: "PA", name: "Panama", flag: "🇵🇦" },
    { code: "GT", name: "Guatemala", flag: "🇬🇹" },
    { code: "SV", name: "El Salvador", flag: "🇸🇻" },
    { code: "HN", name: "Honduras", flag: "🇭🇳" },
    { code: "NI", name: "Nicaragua", flag: "🇳🇮" },
    { code: "DO", name: "Dominican Republic", flag: "🇩🇴" },
    { code: "CU", name: "Cuba", flag: "🇨🇺" },
    { code: "JM", name: "Jamaica", flag: "🇯🇲" },
    { code: "TT", name: "Trinidad and Tobago", flag: "🇹🇹" },
    { code: "BB", name: "Barbados", flag: "🇧🇧" },
    { code: "BS", name: "Bahamas", flag: "🇧🇸" },
    { code: "RU", name: "Russia", flag: "🇷🇺" },
    { code: "UA", name: "Ukraine", flag: "🇺🇦" },
    { code: "BY", name: "Belarus", flag: "🇧🇾" },
    { code: "KZ", name: "Kazakhstan", flag: "🇰🇿" },
    { code: "UZ", name: "Uzbekistan", flag: "🇺🇿" },
    { code: "KG", name: "Kyrgyzstan", flag: "🇰🇬" },
    { code: "TJ", name: "Tajikistan", flag: "🇹🇯" },
    { code: "TM", name: "Turkmenistan", flag: "🇹🇲" },
    { code: "AM", name: "Armenia", flag: "🇦🇲" },
    { code: "AZ", name: "Azerbaijan", flag: "🇦🇿" },
    { code: "GE", name: "Georgia", flag: "🇬🇪" },
    { code: "MD", name: "Moldova", flag: "🇲🇩" },
    { code: "RS", name: "Serbia", flag: "🇷🇸" },
    { code: "ME", name: "Montenegro", flag: "🇲🇪" },
    { code: "BA", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
    { code: "MK", name: "North Macedonia", flag: "🇲🇰" },
    { code: "AL", name: "Albania", flag: "🇦🇱" },
    { code: "XK", name: "Kosovo", flag: "🇽🇰" },
    { code: "MT", name: "Malta", flag: "🇲🇹" },
    { code: "CY", name: "Cyprus", flag: "🇨🇾" },
    { code: "IS", name: "Iceland", flag: "🇮🇸" },
    { code: "LU", name: "Luxembourg", flag: "🇱🇺" },
    { code: "LI", name: "Liechtenstein", flag: "🇱🇮" },
    { code: "MC", name: "Monaco", flag: "🇲🇨" },
    { code: "SM", name: "San Marino", flag: "🇸🇲" },
    { code: "VA", name: "Vatican City", flag: "🇻🇦" },
    { code: "AD", name: "Andorra", flag: "🇦🇩" }
  ];

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCountry = countries.find(country => country.code === value);

  return (
    <div className="space-y-1">
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" />
            <SelectValue placeholder="Select target country">
              {selectedCountry && (
                <span className="flex items-center gap-2">
                  <span>{selectedCountry.flag}</span>
                  <span>{selectedCountry.name}</span>
                </span>
              )}
            </SelectValue>
          </div>
        </SelectTrigger>
        <SelectContent>
          <div className="p-2">
            <Input
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-2"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {filteredCountries.map((country) => (
              <SelectItem key={country.code} value={country.code}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{country.flag}</span>
                  <span>{country.name}</span>
                  <span className="text-muted-foreground text-xs">({country.code})</span>
                </div>
              </SelectItem>
            ))}
          </div>
        </SelectContent>
      </Select>
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
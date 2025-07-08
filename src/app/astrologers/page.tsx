'use client';

import { useState } from 'react';
import { astrologers as allAstrologers } from '@/lib/data';
import type { Astrologer } from '@/lib/types';
import { AstrologerCard } from '@/components/astrologer-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListFilter, Search } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const allLanguages = [
  ...new Set(allAstrologers.map((a) => a.language)),
];
const allSkills = [
  ...new Set(allAstrologers.flatMap((a) => a.skills)),
];

export default function AstrologersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const filteredAstrologers = allAstrologers
    .filter((astrologer) =>
      astrologer.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (astrologer) =>
        selectedLanguages.length === 0 ||
        selectedLanguages.includes(astrologer.language)
    )
    .filter(
      (astrologer) =>
        selectedSkills.length === 0 ||
        selectedSkills.some((skill) => astrologer.skills.includes(skill))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'experience_high':
          return b.experience - a.experience;
        case 'experience_low':
          return a.experience - b.experience;
        case 'price_high':
          return b.price - a.price;
        case 'price_low':
          return a.price - b.price;
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <header className="mb-8 text-center">
        <h1 className="text-2xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Connect with an Astrologer
        </h1>
        <p className="text-lg text-muted-foreground">
          Find the perfect guide for your cosmic journey.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4 mb-6 p-4 border rounded-lg bg-card">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search by name..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex-1 md:flex-none">
                <ListFilter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Filter by Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allLanguages.map((lang) => (
                <DropdownMenuCheckboxItem
                  key={lang}
                  checked={selectedLanguages.includes(lang)}
                  onCheckedChange={(checked) => {
                    setSelectedLanguages(
                      checked
                        ? [...selectedLanguages, lang]
                        : selectedLanguages.filter((l) => l !== lang)
                    );
                  }}
                >
                  {lang}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuLabel>Filter by Skill</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allSkills.map((skill) => (
                <DropdownMenuCheckboxItem
                  key={skill}
                  checked={selectedSkills.includes(skill)}
                  onCheckedChange={(checked) => {
                    setSelectedSkills(
                      checked
                        ? [...selectedSkills, skill]
                        : selectedSkills.filter((s) => s !== skill)
                    );
                  }}
                >
                  {skill}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="experience_high">Experience: High to Low</SelectItem>
              <SelectItem value="experience_low">Experience: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAstrologers.map((astrologer: Astrologer) => (
          <AstrologerCard key={astrologer.id} astrologer={astrologer} />
        ))}
      </div>
      {filteredAstrologers.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p>No astrologers match your criteria.</p>
          <p>Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { Clock } from './Clock';
import { useAuth } from '../../context/AuthContext';

const bibleVerses = [
  "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest. - Joshua 1:9",
  "I can do all things through Christ which strengtheneth me. - Philippians 4:13",
  "Trust in the Lord with all thine heart; and lean not unto thine own understanding. - Proverbs 3:5",
  "But they that wait upon the Lord shall renew their strength; they shall mount up with wings as eagles. - Isaiah 40:31",
  "And we know that all things work together for good to them that love God. - Romans 8:28",
  "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. - Jeremiah 29:11",
  "The Lord is my shepherd; I shall not want. - Psalm 23:1",
  "Commit thy way unto the Lord; trust also in him; and he shall bring it to pass. - Psalm 37:5",
  "Be ye therefore perfect, even as your Father which is in heaven is perfect. - Matthew 5:48",
  "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven. - Matthew 5:16",
  "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you. - Matthew 6:33",
  "Come unto me, all ye that labour and are heavy laden, and I will give you rest. - Matthew 11:28",
  "And be not conformed to this world: but be ye transformed by the renewing of your mind. - Romans 12:2",
  "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things. - Philippians 4:8",
  "Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth. - 2 Timothy 2:15",
  "But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. - 2 Peter 3:18",
  "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him. - James 1:5",
  "Draw nigh to God, and he will draw nigh to you. - James 4:8",
  "Casting all your care upon him; for he careth for you. - 1 Peter 5:7",
  "And this is the confidence that we have in him, that, if we ask any thing according to his will, he heareth us. - 1 John 5:14",
  "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee. - Isaiah 41:10",
  "The steps of a good man are ordered by the Lord: and he delighteth in his way. - Psalm 37:23",
  "Delight thyself also in the Lord: and he shall give thee the desires of thine heart. - Psalm 37:4",
  "Create in me a clean heart, O God; and renew a right spirit within me. - Psalm 51:10",
  "Thy word is a lamp unto my feet, and a light unto my path. - Psalm 119:105",
  "The fear of the Lord is the beginning of wisdom: and the knowledge of the holy is understanding. - Proverbs 9:10",
  "A man's heart deviseth his way: but the Lord directeth his steps. - Proverbs 16:9",
  "Iron sharpeneth iron; so a man sharpeneth the countenance of his friend. - Proverbs 27:17",
  "But he that shall endure unto the end, the same shall be saved. - Matthew 24:13",
  "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new. - 2 Corinthians 5:17"
];

export const Header: React.FC = () => {
  const { user } = useAuth();
  const [verse, setVerse] = useState('');

  useEffect(() => {
    const updateVerse = () => {
      const now = new Date();
      // Create a seed based on the current date to ensure same verse for the whole day
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
      const index = dayOfYear % bibleVerses.length;
      setVerse(bibleVerses[index]);
    };

    updateVerse();
    // Update at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    const timeout = setTimeout(() => {
      updateVerse();
      // Then update every 24 hours
      const interval = setInterval(updateVerse, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex justify-between items-start mb-16 pt-8">
      <div className="flex-1 pr-8">
        <h1 className="text-6xl font-bold text-gray-900 mb-6">Welcome Back, {user?.firstName || 'User'}</h1>
        <p className="text-lg text-gray-600 leading-relaxed italic max-w-4xl">
          {verse}
        </p>
      </div>
      <Clock />
    </div>
  );
};
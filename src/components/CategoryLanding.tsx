import { useNavigate } from 'react-router';
import { AlertCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  gradient: string;
}

const categories: Category[] = [
  {
    id: 'VVS',
    name: 'VVS',
    image: 'https://images.unsplash.com/photo-1654440122140-f1fc995ddb34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwdG9vbHMlMjB3YXRlciUyMHBpcGV8ZW58MXx8fHwxNzcxNTA2MTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Vandskader, utætte rør, stoppede afløb',
    gradient: 'from-blue-600/80 to-blue-800/80'
  },
  {
    id: 'Elektriker',
    name: 'Elektriker',
    image: 'https://images.unsplash.com/photo-1751486289947-4f5f5961b3aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2lhbiUyMHdvcmslMjB3aXJpbmd8ZW58MXx8fHwxNzcxNTA2MTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Strømafbrydelser, elproblemer, fejlfinding',
    gradient: 'from-yellow-600/80 to-orange-700/80'
  },
  {
    id: 'Kloakfirma',
    name: 'Kloakfirma',
    image: 'https://images.unsplash.com/photo-1650246363606-a2402ec42b08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMGRyYWluJTIwcGlwZSUyMHdvcmt8ZW58MXx8fHwxNzcxNTA2MjQwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Kloakproblemer, stoppede afløb, TV-inspektion',
    gradient: 'from-gray-700/80 to-gray-900/80'
  },
  {
    id: 'Låsesmed',
    name: 'Låsesmed',
    image: 'https://images.unsplash.com/photo-1667857399223-593f0b4e0961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2Nrc21pdGglMjBrZXlzJTIwbG9ja3xlbnwxfHx8fDE3NzE1MDYxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Låst ude, nødåbning, låseskift',
    gradient: 'from-purple-600/80 to-purple-800/80'
  },
  {
    id: 'Glarmester',
    name: 'Glarmester',
    image: 'https://images.unsplash.com/photo-1723400830780-64e3d550705b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMHdpbmRvdyUyMHJlcGFpcnxlbnwxfHx8fDE3NzE1MDYxMzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Knust glas, akut udskiftning, reparation',
    gradient: 'from-cyan-600/80 to-cyan-800/80'
  },
  {
    id: 'Andet akut',
    name: 'Andet akut',
    image: 'https://images.unsplash.com/photo-1742069028920-c2acf52aaa9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBzZXJ2aWNlJTIwcm9hZHNpZGUlMjBhc3Npc3RhbmNlfGVufDF8fHx8MTc3MTUwNjEzNHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Sikkerhedsvagt, autohjælp, andre akutte behov',
    gradient: 'from-red-600/80 to-red-800/80'
  }
];

export function CategoryLanding() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/kategori/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Akutvagt</h1>
            </div>
            <p className="text-lg sm:text-xl text-gray-600 mt-3">
              Vælg kategori for at finde akut hjælp i dit område
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Hvad har du brug for hjælp til?
          </h2>
          <p className="text-gray-600">
            Vælg den kategori, der passer til dit akutte behov
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 h-64"
              >
                {/* Background Image */}
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient}`} />
                
                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <div className="text-center space-y-3">
                    <h3 className="text-3xl font-bold drop-shadow-lg">{category.name}</h3>
                    <p className="text-sm text-white/95 leading-relaxed drop-shadow-md">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
              </button>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600 text-sm">
            <p>© 2026 Akutvagt. Alle rettigheder forbeholdes.</p>
            <p className="mt-2">
              Ring altid og bekræft priser før håndværkeren kommer ud.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
import { Shield, Globe, Lock, Zap, CheckCircle, ArrowRight, GraduationCap, Building2, Users } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                <GraduationCap className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Secure Academic Credentials
              <span className="block text-blue-600 mt-2">On the Blockchain</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              A decentralized platform enabling instant verification of academic credentials
              for students pursuing higher education abroad. Built on Ethereum Sepolia with
              soulbound token technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onGetStarted}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      <div id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Revolutionary technology ensuring the authenticity and portability of academic credentials worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Immutable Security</h3>
              <p className="text-gray-600">
                Credentials stored on the blockchain cannot be forged, altered, or deleted,
                ensuring permanent proof of academic achievement.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Verification</h3>
              <p className="text-gray-600">
                Universities and employers can verify credentials in seconds, eliminating
                lengthy verification processes and reducing fraud.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Interoperability</h3>
              <p className="text-gray-600">
                Standards-based solution recognized internationally, enabling seamless
                credential sharing across borders for study abroad programs.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy Protected</h3>
              <p className="text-gray-600">
                Students control who can access their credentials through secure sharing
                mechanisms and privacy-preserving verification.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-teal-50 to-white rounded-2xl border border-teal-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lifelong Ownership</h3>
              <p className="text-gray-600">
                Soulbound tokens ensure students maintain permanent ownership of their
                credentials throughout their academic and professional journey.
              </p>
            </div>

            <div className="p-8 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tamper-Proof Records</h3>
              <p className="text-gray-600">
                Built-in audit trails and cryptographic proofs ensure that every credential
                is authentic and has not been modified.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Three simple steps to secure, verifiable credentials
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Building2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">1. Issue</h3>
              <p className="text-gray-600">
                Institutions mint credentials as NFTs or soulbound tokens on the Sepolia blockchain,
                storing detailed academic information securely.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">2. Store</h3>
              <p className="text-gray-600">
                Students receive credentials in their digital wallet, maintaining full control
                and ownership. Transcripts and certificates are stored on IPFS.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">3. Verify</h3>
              <p className="text-gray-600">
                Universities and employers instantly verify credentials using blockchain
                technology, with QR codes for quick access.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Academic Verification?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join institutions and students worldwide in building a transparent,
              decentralized ecosystem for academic credentials.
            </p>
            <button
              onClick={onGetStarted}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors inline-flex items-center shadow-lg hover:shadow-xl"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Blockchain-Based</div>
              <p className="text-gray-600">Ethereum Sepolia Testnet</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">Soulbound Tokens</div>
              <p className="text-gray-600">Non-Transferable NFTs</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">IPFS Storage</div>
              <p className="text-gray-600">Decentralized Document Storage</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

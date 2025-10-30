# Academic Credentials Blockchain System - PPT Documentation

## Slide 1: Technical Approach

### Technologies & Frameworks

**Blockchain Layer**
- **Ethereum Blockchain (Sepolia Testnet)** - Decentralized ledger for immutable credential storage
- **Solidity ^0.8.20** - Smart contract programming language
- **OpenZeppelin Contracts** - Industry-standard secure contract libraries (ERC721, Ownable, Counters)
- **Ethers.js v6.15.0** - Ethereum wallet and contract interaction library
- **MetaMask** - Web3 wallet integration for blockchain transactions

**Frontend Technologies**
- **React 18.3.1** - Component-based UI framework
- **TypeScript 5.5.3** - Type-safe JavaScript development
- **Vite 5.4.2** - Fast build tool and development server
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React** - Icon library for modern UI components
- **qrcode.react** - QR code generation for credential sharing

**Backend & Storage**
- **Supabase** - PostgreSQL database for credential indexing and audit trails
- **Pinata/IPFS** - Decentralized file storage for credential documents
- **Row Level Security (RLS)** - Database-level access control

### Implementation Methodology

**1. Smart Contract Architecture (Soulbound Tokens)**
- Implemented non-transferable NFTs (ERC721) ensuring credentials cannot be transferred or sold
- Credential issuance restricted to authorized institutions via role-based access control
- On-chain storage of credential metadata (degree, institution, IPFS hash, timestamps)
- Revocation mechanism for invalidating compromised or incorrect credentials
- Event emission for complete audit trail (CredentialIssued, CredentialRevoked)

**2. Decentralized Storage Strategy**
- PDF credential documents uploaded to IPFS via Pinata API
- Content-addressable storage ensures document integrity (hash-based verification)
- Only IPFS hashes stored on-chain, reducing gas costs and blockchain bloat
- Documents remain permanently accessible via distributed IPFS network

**3. Hybrid Data Layer**
- Blockchain serves as authoritative source of truth for credential validity
- Supabase provides fast querying, indexing, and search capabilities
- Three-table schema: credentials, credential_shares, audit_logs
- Automatic timestamp tracking and update triggers
- Database mirrors blockchain state for optimal performance

**4. Security Implementation**
- Multi-layer verification: blockchain authenticity + IPFS document integrity
- RLS policies ensure data access follows business logic
- Institution authorization system prevents unauthorized credential issuance
- Share tokens with expiration for time-limited credential access
- Comprehensive audit logging of all system actions

### Feasibility & Robustness

**Scalability**
- IPFS storage eliminates centralized file server bottlenecks
- Database indexing enables instant credential lookups across millions of records
- Blockchain immutability provides permanent, tamper-proof record keeping
- Testnet deployment allows risk-free development and testing

**Viability**
- Standards-based approach (ERC721) ensures ecosystem compatibility
- Open-source components reduce vendor lock-in and development costs
- MetaMask integration provides universal Web3 wallet support
- Supabase offers managed PostgreSQL with built-in security features

**Robustness**
- Soulbound tokens prevent credential theft and resale
- Revocation mechanism handles fraud or errors without data deletion
- Comprehensive error handling at all system layers
- Redundant storage (blockchain + IPFS + database) ensures data availability

**Security Features**
- Private key ownership proves credential authenticity
- Multi-signature authorization for institution management
- Time-based credential sharing prevents permanent data exposure
- Immutable audit trail enables forensic analysis

---

## Slide 2: User Workflow

### Primary User Journeys

**Journey 1: Institution Issues Credential**

1. **Institution Login** → Connect MetaMask wallet to application
   - *System Response:* Verifies institution wallet is authorized on smart contract

2. **Navigate to Dashboard** → Access institution control panel
   - *System Response:* Displays issuance form and credential history

3. **Fill Credential Details** → Enter student wallet address, degree name, select PDF document
   - *System Response:* Real-time validation of input fields

4. **Upload & Submit** → Click "Issue Credential" button
   - *System Response:*
     - Uploads PDF to IPFS and receives content hash
     - Initiates blockchain transaction via MetaMask
     - Shows transaction confirmation modal

5. **Transaction Confirmation** → Approve gas fees in MetaMask
   - *System Response:*
     - Mints soulbound NFT to student's wallet
     - Records credential in database with token ID
     - Logs action in audit trail
     - Displays success notification with token ID and transaction hash

**Journey 2: Student Views & Shares Credential**

1. **Student Login** → Connect personal MetaMask wallet
   - *System Response:* Retrieves all credentials owned by wallet address

2. **View Wallet** → Browse credential collection
   - *System Response:* Displays cards with degree, institution, issue date, verification status

3. **Select Credential** → Click specific credential to view details
   - *System Response:* Shows full metadata, IPFS document link, blockchain verification proof

4. **Generate Share Link** → Click "Share" button, specify recipient and expiration
   - *System Response:*
     - Creates unique share token with time-based access control
     - Generates QR code and shareable URL
     - Stores share record in database

5. **Share with Employer** → Send QR code or link to verifying party
   - *System Response:* Share link ready for instant verification

**Journey 3: Employer/Third Party Verification**

1. **Receive Credential** → Scan QR code or click shared link
   - *System Response:* Validates share token hasn't expired

2. **View Verification Portal** → Credential details displayed with verification status
   - *System Response:*
     - Queries blockchain for current credential status
     - Checks revocation status in real-time
     - Displays issuing institution, degree, issue date
     - Shows PDF document from IPFS
     - Increments access counter

3. **Verify Authenticity** → Review blockchain transaction proof
   - *System Response:*
     - Provides Etherscan link to transaction
     - Shows token ownership proof
     - Displays institution authorization status
     - Confirms document hash matches IPFS content

4. **Export/Print** → Download verification report
   - *System Response:* Generates PDF report with QR code, blockchain proof, timestamp

**Journey 4: Revocation Flow**

1. **Institution Identifies Issue** → Discovers error or fraud in issued credential
   - *User Action:* Navigate to institution dashboard

2. **Search Credential** → Find credential by token ID or student address
   - *System Response:* Displays credential with current status

3. **Initiate Revocation** → Click "Revoke" button
   - *System Response:* Shows confirmation warning modal

4. **Confirm Revocation** → Approve blockchain transaction
   - *System Response:*
     - Updates revoked flag on-chain
     - Marks credential as revoked in database
     - Logs revocation in audit trail
     - Invalidates all active share links

5. **Verification Impact** → Any future verification attempts
   - *System Response:* Displays "REVOKED" status with timestamp

### Key System Responses & Simplifications

**Ease of Use Enhancements**
- **One-Click Wallet Connection**: No manual configuration required
- **Automatic Network Switching**: Prompts to switch to Sepolia if wrong network
- **Pre-filled Forms**: Smart defaults reduce data entry
- **Real-time Validation**: Immediate feedback prevents errors
- **QR Code Sharing**: Mobile-friendly verification without typing
- **Persistent Sessions**: Credentials cached for offline viewing
- **Progress Indicators**: Clear feedback during blockchain transactions

**Problem Solving**
- **Eliminates Document Forgery**: Blockchain verification proves authenticity
- **Instant Verification**: No waiting for institution responses (days → seconds)
- **Privacy Control**: Students control who sees credentials and for how long
- **Permanent Records**: Credentials survive institutional shutdowns
- **Fraud Prevention**: Revocation mechanism protects all parties
- **Universal Acceptance**: Standards-based approach works globally

**Logical Flow Connections**
- Institution authorization → Credential issuance → Student ownership → Verification → Audit trail
- Each step cryptographically linked via blockchain transactions
- Database provides fast UI layer while blockchain ensures trust
- IPFS bridges document storage with on-chain verification
- Share tokens enable privacy without sacrificing verifiability

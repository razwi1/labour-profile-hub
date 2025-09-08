import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  Eye,
  Users,
  Shield
} from "lucide-react";
import { supabase, isSupabaseReady, type UserProfile } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([]);
  const [verifiedUsers, setVerifiedUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    if (!isSupabaseReady) {
      toast({
        title: "Demo Mode",
        description: "Supabase integration is being set up. Showing demo data.",
        variant: "default"
      });
      
      // Show demo data for development
      const demoUsers: UserProfile[] = [
        {
          id: '1',
          email: 'john.doe@example.com',
          first_name: 'John',
          last_name: 'Doe',
          role: 'labour',
          verification_status: 'pending',
          documents: ['id-card.pdf', 'certificate.pdf'],
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          email: 'jane.smith@example.com',
          first_name: 'Jane',
          last_name: 'Smith',
          role: 'supervisor',
          verification_status: 'pending',
          documents: ['resume.pdf'],
          created_at: new Date().toISOString()
        }
      ];
      
      setPendingUsers(demoUsers);
      setVerifiedUsers([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const pending = data?.filter(user => user.verification_status === 'pending') || [];
      const verified = data?.filter(user => user.verification_status === 'approved') || [];
      
      setPendingUsers(pending);
      setVerifiedUsers(verified);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserVerification = async (userId: string, status: 'approved' | 'rejected') => {
    if (!isSupabaseReady) {
      toast({
        title: "Demo Mode",
        description: `User would be ${status} in production`,
        variant: "default"
      });
      
      // Simulate the action for demo
      if (status === 'approved') {
        const userToMove = pendingUsers.find(u => u.id === userId);
        if (userToMove) {
          setPendingUsers(prev => prev.filter(u => u.id !== userId));
          setVerifiedUsers(prev => [...prev, { ...userToMove, verification_status: 'approved' }]);
        }
      } else {
        setPendingUsers(prev => prev.filter(u => u.id !== userId));
      }
      return;
    }

    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ verification_status: status })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `User ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      });

      fetchUsers(); // Refresh the list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const viewDocuments = async (documentPaths: string[]) => {
    // In a real implementation, you'd open the documents in a modal or new tab
    toast({
      title: "Documents",
      description: `${documentPaths.length} document(s) uploaded`,
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'labour': return 'bg-blue-100 text-blue-800';
      case 'supervisor': return 'bg-green-100 text-green-800';
      case 'site_manager': return 'bg-purple-100 text-purple-800';
      case 'client_contractor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-warning" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage user verification and system access</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{pendingUsers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{verifiedUsers.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingUsers.length + verifiedUsers.length}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending ({pendingUsers.length})
            </TabsTrigger>
            <TabsTrigger value="verified" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Verified ({verifiedUsers.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingUsers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No pending verifications</p>
                </CardContent>
              </Card>
            ) : (
              pendingUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {user.first_name[0]}{user.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-1">
                          <h3 className="font-semibold">
                            {user.first_name} {user.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(user.verification_status)}
                              <span className="text-sm capitalize">{user.verification_status}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDocuments(user.documents)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Docs ({user.documents.length})
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUserVerification(user.id, 'rejected')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        
                        <Button
                          size="sm"
                          onClick={() => handleUserVerification(user.id, 'approved')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="verified" className="space-y-4">
            {verifiedUsers.length === 0 ? (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No verified users yet</p>
                </CardContent>
              </Card>
            ) : (
              verifiedUsers.map((user) => (
                <Card key={user.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarFallback>
                            {user.first_name[0]}{user.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="space-y-1">
                          <h3 className="font-semibold">
                            {user.first_name} {user.last_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getRoleBadgeColor(user.role)}>
                              {user.role.replace('_', ' ')}
                            </Badge>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(user.verification_status)}
                              <span className="text-sm capitalize text-success">Verified</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDocuments(user.documents)}
                        >
                          <FileText className="h-4 w-4 mr-1" />
                          Documents ({user.documents.length})
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
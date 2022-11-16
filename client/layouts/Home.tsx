import { AppShell, Header, Navbar, Box } from "@mantine/core";
import Image from "next/image";
import React from "react";


function HomePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell padding="md" 
        navbar={
            <Navbar width={{base: 300}} height={500} p="xs">
                Side items
            </Navbar>}
        header={
            <Header height={60} p="xs">
                <Box>
                    <Box>
                       <Image src="/logo.png" alt="logo" width={100} height={40} />
                    </Box>
                </Box> 
            </Header>
        }    
        >
        {children}
    </AppShell>
  );
}

export default HomePageLayout;

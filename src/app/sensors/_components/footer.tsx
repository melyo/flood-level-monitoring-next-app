import Container from '@/components/container'
import SocketManager from '@/components/socket-manager'

export default function Footer() {
  return (
    <footer>
      <Container>
        <div className="flex items-center justify-between py-4">
          <SocketManager />
          <div>
            <span>&copy; 2024 Flood Wave</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}

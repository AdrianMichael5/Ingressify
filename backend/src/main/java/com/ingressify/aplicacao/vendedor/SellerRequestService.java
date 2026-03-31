package com.ingressify.aplicacao.vendedor;

import com.ingressify.dominio.usuario.User;
import com.ingressify.dominio.usuario.UserRepository;
import com.ingressify.dominio.vendedor.SellerRequest;
import com.ingressify.dominio.vendedor.SellerRequestRepository;
import com.ingressify.dominio.vendedor.SellerRequestStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SellerRequestService {

    private final SellerRequestRepository sellerRequestRepository;
    private final UserRepository userRepository;

    public SellerRequestService(SellerRequestRepository sellerRequestRepository, UserRepository userRepository) {
        this.sellerRequestRepository = sellerRequestRepository;
        this.userRepository = userRepository;
    }

    public SellerRequestResponse createRequest(String email, SellerRequestDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if ("SELLER".equals(user.getRole())) {
            throw new RuntimeException("Você já é um vendedor");
        }

        if (sellerRequestRepository.existsByUserIdAndStatus(user.getId(), SellerRequestStatus.PENDING)) {
            throw new RuntimeException("Você já possui uma solicitação pendente");
        }

        SellerRequest request = new SellerRequest();
        request.setUser(user);
        request.setBusinessName(dto.getBusinessName());
        request.setDocument(dto.getDocument());
        request.setPhone(dto.getPhone());
        request.setDescription(dto.getDescription());
        request.setStatus(SellerRequestStatus.PENDING);

        sellerRequestRepository.save(request);
        return toResponse(request);
    }

    public SellerRequestResponse getStatus(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        SellerRequest request = sellerRequestRepository.findTopByUserIdOrderByCreatedAtDesc(user.getId())
                .orElse(null);

        if (request == null) return null;
        return toResponse(request);
    }

    public List<SellerRequestResponse> getPendingRequests() {
        return sellerRequestRepository.findByStatusOrderByCreatedAtAsc(SellerRequestStatus.PENDING)
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public SellerRequestResponse approve(Long id) {
        SellerRequest request = sellerRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        request.setStatus(SellerRequestStatus.APPROVED);
        sellerRequestRepository.save(request);

        User user = request.getUser();
        user.setRole("SELLER");
        userRepository.save(user);

        return toResponse(request);
    }

    public SellerRequestResponse reject(Long id) {
        SellerRequest request = sellerRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));

        request.setStatus(SellerRequestStatus.REJECTED);
        sellerRequestRepository.save(request);

        return toResponse(request);
    }

    private SellerRequestResponse toResponse(SellerRequest request) {
        SellerRequestResponse response = new SellerRequestResponse();
        response.setId(request.getId());
        response.setUserId(request.getUser().getId());
        response.setUserName(request.getUser().getName());
        response.setUserEmail(request.getUser().getEmail());
        response.setBusinessName(request.getBusinessName());
        response.setDocument(request.getDocument());
        response.setPhone(request.getPhone());
        response.setDescription(request.getDescription());
        response.setStatus(request.getStatus().name());
        response.setCreatedAt(request.getCreatedAt());
        return response;
    }
}

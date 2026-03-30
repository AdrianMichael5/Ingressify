package com.ingressify.seller;

import jakarta.validation.constraints.NotBlank;

public class SellerRequestDTO {

    @NotBlank(message = "Nome do estabelecimento é obrigatório")
    private String businessName;

    @NotBlank(message = "CPF ou CNPJ é obrigatório")
    private String document;

    @NotBlank(message = "Telefone é obrigatório")
    private String phone;

    private String description;

    public String getBusinessName() { return businessName; }
    public void setBusinessName(String businessName) { this.businessName = businessName; }

    public String getDocument() { return document; }
    public void setDocument(String document) { this.document = document; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
